import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';

import './formStyle.scss';

const TextField = (props) => {
  const { code, name, placeholder, ...rest } = props;
  const { errors } = useFormikContext();
  return (
    <div className="field-wrapper">
      <div className={`field ${errors[code] ? 'field-error' : ''}`}>
        {name && (
          <label htmlFor={name} className="label">
            {name}:
          </label>
        )}
        <Field
          className="form-control"
          type="text"
          name={code}
          id={code}
          placeholder={placeholder || ''}
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

export default TextField;
