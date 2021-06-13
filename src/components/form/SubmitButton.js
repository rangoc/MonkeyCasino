import React from 'react';
import { useFormikContext } from 'formik';

const SubmitButton = (props) => {
  const { title, ...rest } = props;
  const { isValid, isSubmitting } = useFormikContext();
  return (
    <button type="submit" {...rest} disabled={!isValid || isSubmitting}>
      {title}
    </button>
  );
};

export default SubmitButton;
