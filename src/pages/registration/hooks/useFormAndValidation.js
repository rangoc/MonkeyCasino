import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import formSchema from 'sampleData.json';

const useFormAndValidation = () => {
  // Form & validationSchema state management
  const [formData, setFormData] = useState('');
  const [validationSchema, setValidationSchema] = useState({});
  useEffect(() => {
    initForm(formSchema);
  }, []);
  // create form & validation schema from JSON
  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    // parsing JSON and dynamically creating validation schema
    formSchema.map(({ code, fieldType, validators, ...rest }) => {
      _formData[code] = '';
      _validationSchema[code] = Yup.string();
      if (fieldType === 'string') {
        if (rest.required === true) {
          _validationSchema[code] =
            _validationSchema[code].required('Required');
        }
        validators.map(({ key, parameters, invalid_message, ...rest }) => {
          if (key === 'minLength') {
            _validationSchema[code] = _validationSchema[code].min(
              parameters.targetLength,
              invalid_message
            );
          }
          if (key === 'maxLength') {
            _validationSchema[code] = _validationSchema[code].max(
              parameters.targetLength,
              invalid_message
            );
          }
          if (key === 'lettersOnlyValidator') {
            const regex = new RegExp('^[a-zA-Z]+$');
            _validationSchema[code] = _validationSchema[code].matches(
              regex,
              invalid_message
            );
          }
          if (key === 'emailValidator') {
            _validationSchema[code] =
              _validationSchema[code].email(invalid_message);
          }
          return { key, parameters, invalid_message, ...rest };
        });
      } else {
        // password
        if (code === 'password') {
          validators.map(
            ({ key, invalid_message, parameters: { regex }, ...rest }) => {
              if (key === 'passwordStrength') {
                const passwordRegex = new RegExp(regex);
                _validationSchema[code] = _validationSchema[code].matches(
                  passwordRegex,
                  invalid_message
                );
              }
              return { key, parameters: { regex }, invalid_message, ...rest };
            }
          );
        } else {
          // password_confirm
          validators.map(
            ({ key, invalid_message, parameters: { regex }, ...rest }) => {
              if (key === 'passwordStrength') {
                const passwordRegex = new RegExp(regex);
                _validationSchema[code] = _validationSchema[code]
                  .oneOf([Yup.ref('password')], 'Missmatched passwords')
                  .matches(passwordRegex, invalid_message);
              }
              return { key, parameters: { regex }, invalid_message, ...rest };
            }
          );
        }
      }
      return { code, fieldType, validators, ...rest };
    });
    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };
  return [formData, validationSchema];
};

export default useFormAndValidation;
