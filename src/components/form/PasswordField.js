import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';

import './formStyle.scss';

const PasswordField = (props) => {
  const { code, name, placeholder, ...rest } = props;
  const { errors } = useFormikContext();

  return (
    <div className="field-wrapper">
      <div className={`field ${errors[code] ? 'field-error' : ''}`}>
        {name && (
          <label className="label" htmlFor={name}>
            {name}:
          </label>
        )}
        <Field
          className="form-control"
          type="password"
          name={code}
          id={code}
          placeholder={placeholder || ''}
          autoComplete="true"
          {...rest}
        />
      </div>
      <ErrorMessage
        name={code}
        render={(msg) => <div className="errorMessage">{msg}</div>}
      />
    </div>
  );
};

export default PasswordField;
