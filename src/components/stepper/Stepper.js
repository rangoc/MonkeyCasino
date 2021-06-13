import React, { useState, useEffect } from 'react';
import './stepper.scss';
const Stepper = ({ currentStep = 1, steps }) => {
  const [stepState, setStepState] = useState([]);
  useEffect(() => {
    let createSteps = steps.map((step, index) => ({
      description: step,
      completed: index < currentStep - 1, // past are completed
      selected: index === currentStep - 1, // only present is colored, used for number label
      highlighted: index === currentStep - 1, // only present is highlighted, used for description
    }));
    setStepState(createSteps);
  }, [steps, currentStep]);
  return (
    <div className="stepper">
      {stepState.map(
        ({ selected, completed, highlighted, description }, index) => (
          <div className="step-wrapper" key={index}>
            <div
              className={`step-number step-number-${
                selected ? 'selected' : 'disabled'
              } ${completed ? 'step-number-completed' : ''}`}
            >
              {completed ? '✔' : index + 1}
            </div>
            <div
              className={`step-description ${
                highlighted ? 'step-description-active' : ''
              }`}
            >
              {description}
            </div>
            {index + 1 !== stepState.length && (
              <div
                className={`divider-line ${
                  completed ? 'divider-line-active' : ''
                }`}
              ></div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Stepper;
