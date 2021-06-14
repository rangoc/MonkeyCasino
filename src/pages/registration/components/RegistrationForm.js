import React, { useState, useEffect, useContext } from 'react';
import { useFormikContext } from 'formik';
import { MultiLanguageSupportContext } from 'context/MultiLanguageSupportProvider';

// components
import Stepper from 'components/stepper/Stepper';
import PasswordField from 'components/form/PasswordField';
import TextField from 'components/form/TextField';
import SubmitButton from 'components/form/SubmitButton';

import formSchema from 'sampleData.json';

import './registrationForm.scss';
import Loader from 'components/loader/Loader';

const StepperValues = {
  personalInfo: 1,
  credentials: 2,
  goal: 3,
};

const fieldsOnFirstStep = ['fname', 'lname'];
const RegistrationForm = ({ isRegistrationComplete }) => {
  useEffect(() => {
    if (isRegistrationComplete.completed) {
      setCurrentStep(StepperValues.goal);
    }
  }, [isRegistrationComplete.completed]);

  const { values, errors, isSubmitting } = useFormikContext();
  const { t } = useContext(MultiLanguageSupportContext);
  // Stepper state management
  const stepsArray = [
    t('step-personalInfo'),
    t('step-credentials'),
    t('step-goal'),
  ];
  const [currentStep, setCurrentStep] = useState(StepperValues.personalInfo);

  // Stepper click handler
  const handleClick = (clickType) => {
    let newStep = currentStep;
    clickType === 'next' ? newStep++ : newStep--;

    if (newStep > 0 && newStep <= 2) {
      setCurrentStep(newStep);
    }
  };

  // Dynamically generate form element
  const getFormElement = (schemaObject) => {
    const props = {
      code: schemaObject.code,
      name: schemaObject.name,
      placeholder: schemaObject.name,
    };
    if (schemaObject.fieldType === 'string') {
      return <TextField {...props} />;
    }
    if (schemaObject.fieldType === 'password') {
      return <PasswordField {...props} />;
    }
  };

  // logic for displaying appropriate buttons
  const getButtons = () => {
    return (
      <div className="buttonsContainer">
        {currentStep === StepperValues.credentials && (
          <button type="button" onClick={handleClick}>
            {t('button-previous')}
          </button>
        )}
        {currentStep === StepperValues.credentials && (
          <SubmitButton title={t('button-submit')} />
        )}
        {currentStep === StepperValues.personalInfo && (
          <button
            type="button"
            onClick={() => handleClick('next')}
            disabled={
              values.fname === '' ||
              values.lname === '' ||
              errors.hasOwnProperty('fname') ||
              errors.hasOwnProperty('lname')
            }
          >
            {t('button-next')}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="formWrapper">
      <Stepper currentStep={currentStep} steps={stepsArray} />

      <section
        className={`personalInfo ${
          currentStep === StepperValues.personalInfo
            ? ''
            : 'personalInfo-hidden'
        }`}
      >
        {formSchema.map((schemaObject) => {
          if (fieldsOnFirstStep.includes(schemaObject.code)) {
            return (
              <div key={schemaObject.code}>{getFormElement(schemaObject)}</div>
            );
          }
          return false;
        })}
      </section>
      {isSubmitting ? (
        <Loader />
      ) : (
        <section
          className={`credentials ${
            currentStep === StepperValues.credentials
              ? ''
              : 'credentials-hidden'
          }`}
        >
          {formSchema.map((schemaObject) => {
            if (!fieldsOnFirstStep.includes(schemaObject.code)) {
              return (
                <div key={schemaObject.code}>
                  {getFormElement(schemaObject)}
                </div>
              );
            }
            return false;
          })}
        </section>
      )}
      <section className="goal">{isRegistrationComplete.message}</section>
      {getButtons()}
    </div>
  );
};

export default RegistrationForm;
