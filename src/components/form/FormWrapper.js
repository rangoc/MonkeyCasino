import { Formik, Form as FormikForm } from 'formik';

import './formStyle.scss';
const FormWrapper = (props) => {
  return (
    <Formik {...props}>
      <FormikForm className="form-container" noValidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
};

export default FormWrapper;
