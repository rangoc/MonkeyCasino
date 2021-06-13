import { Formik, Form as FormikForm } from 'formik';

const FormWrapper = (props) => {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" noValidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
};

export default FormWrapper;
