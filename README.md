# Demo 	:monkey_face: 
[Monkey Casino](https://monkey-casino-registration.netlify.app/)

# How to run
`git clone` the project locally  
`yarn install` to install all the dependencies  
`yarn start` to run the project in your browser


# Project overview :monkey_face:
#### Functional requirements:
The client required a multi-step registration form with dynamic input fields and dynamic validation built from a sample [json schema](https://github.com/rangoc/Registration-Form/blob/main/src/sampleData.json) replicating the type of data structure that will be sent from their own backend server. The requirements for multi-step registration were that a user could not go to the second step of registration without first completing the first, and that there should be a visual "approval" when they did so. A language switch should also be implemented, allowing you to select from two alternatives (currently): `English` or `Croatian`, and a loader displayed when simulating an API call to the beckend server. On all screen sizes: mobile, tablet, laptop, and desktop, the form should be responsive and look well.

#### Visual requirements 
Client requested that the visual components of his websites "scream MONKEYS!!!" since he adores them, and that the registration page ( form ) be brightly colored. The rest is up to your imagination and inventiveness.

#### Deadline: 7 days
## Implementation & Thought process 
#### Visuals

##### Assets & color palette
Due to the client's need for monkeys to be a main visual of the website, I had to first find the correct assets to use ( drawings, photos ) e.g.  [monkey](https://github.com/rangoc/Registration-Form/blob/main/src/assets/monkey.png), [monkeyLogo](https://github.com/rangoc/Registration-Form/blob/main/src/assets/monkeyLogo.png), and it was critical that those assets be "flat" and not have a "3d" feel to them, as it was not the style I was aiming for as an end-goal. I had already decided that the entire website/form would have a cartoonish look with vibrant colors, and those images worked perfectly (it's worth noting that working with assets with transparent backgrounds is extremely important because they are extremely "flexible" when it comes to experimenting with your own custom color schemes and palettes). In terms of color, I chose green/yellow since they are the most indicative of the jungle/bananas, both of which are associated with monkeys, and they complement the brown-ish color of my primary assets wonderfully.
##### Background
Once I had my assets and palette in place, I decided on a smooth progressive linear gradient for the background, progressing from green to yellow from bottom left to top right, with the bottom left corner being the darkest and the top right corner being the lightest point on the website ( simulating the point from where the main light source is coming, that later on would decide where the shadow would be cast ).
I wanted the [monkeys](https://github.com/rangoc/Registration-Form/blob/main/src/assets/monkey.png) to be spread horizontally, repeating themselves, trying to make them look just like in real life, where they are usually seen in groups following each other.

##### Form
Because this is a form for a casino (and casinos are 18+ because they revolve around gambling), I had to choose a dark color as the primary color to convey seriousness, and a green hue as a secondary color to meet the "bright colors" criteria. In addition, because the light source was coming from the top right corner, I used a linear gradient from the bottom left to the top right corner, as well as a box shadow on the left side, to make it stand out from the background.
###### Form Layout
The form should feature a header with the app's branding as well as a Language Switch option.  
On larger displays (laptop, desktop), I chose a horizontal arrangement, dividing the form vertically into two sections: the left half would be used for an animation (to increase engagement), while the right half would be used for form fields and a stepper ( who will display correct steps of multi-step registration).  
On smaller screens, the layout would be vertical, with the header, animation, and form fields in that sequence. The animation I was trying for was obviously going to be about casinos, just to reinforce the purpose behind the form and make it plain to the user that this is a CASINO registration form.  
[Lottie files](https://github.com/rangoc/Registration-Form/blob/main/src/assets/lotties/dice.json) ( animations ) are ideal for the web because they are optimized and blend in seamlessly with the rest of the design.  
That's pretty much it; everything else is basically little designer touches that are somewhat subjective to taste, such as fonts, input field styles, buttons, and letters, all of which can be found in sass files and code without me having to go into detail about them.
#### Functions
I'll try to keep this one short by simply giving a brief summary of the functionalities and how I implemented them; of course, the code is available for a more in-depth look. :grin:

##### Project anatomy: 
```
── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── locales
│       ├── en
│       │   └── translation.json
│       └── hr
│           └── translation.json
├── README.md
├── src
│   ├── App.js
│   ├── app.scss
│   ├── assets
│   │   ├── croatia.svg
│   │   ├── lotties
│   │   │   ├── dice.json
│   │   │   └── money.json
│   │   ├── monkeyLogo.png
│   │   ├── monkey.png
│   │   ├── united-kingdom.svg
│   │   └── wave.svg
│   ├── components
│   │   ├── form
│   │   │   ├── formStyle.scss
│   │   │   ├── FormWrapper.js
│   │   │   ├── PasswordField.js
│   │   │   ├── SubmitButton.js
│   │   │   └── TextField.js
│   │   ├── languagePicker
│   │   │   ├── LanguagePicker.js
│   │   │   └── languagePicker.scss
│   │   ├── loader
│   │   │   ├── Loader.js
│   │   │   └── loader.scss
│   │   └── stepper
│   │       ├── Stepper.js
│   │       └── stepper.scss
│   ├── context
│   │   └── MultiLanguageSupportProvider.js
│   ├── includeMedia.scss
│   ├── index.js
│   ├── index.scss
│   ├── pages
│   │   └── registration
│   │       ├── components
│   │       │   ├── RegistrationForm.js
│   │       │   └── registrationForm.scss
│   │       ├── hooks
│   │       │   └── useFormAndValidation.js
│   │       ├── Registration.js
│   │       └── registration.scss
│   ├── sampleData.json
│   └── utils
│       └── multiLanguageSupport.js
├── yarn-error.log
└── yarn.lock
```
Inside the App component, I'm rendering the [Register](https://github.com/rangoc/Registration-Form/blob/main/src/pages/registration/Registration.js) component from, which utilizes a custom hook [useFormAndValidation](https://github.com/rangoc/Registration-Form/blob/main/src/pages/registration/hooks/useFormAndValidation.js), which returns `formData` and `validationSchema`, the first of which is used as `initialValues` and the second of which is used as `validationSchema` for a [FormWrapper](https://github.com/rangoc/Registration-Form/blob/main/src/pages/registration/Registration.js#L112) component (this component is using Formik and Yup under the hood).  
The [RegistrationForm](https://github.com/rangoc/Registration-Form/blob/9ea8d809dc469f62e9f3b33d9e55a9214728734d/src/pages/registration/components/RegistrationForm.js#L23) component, which is part of the [FormWrapper](https://github.com/rangoc/Registration-Form/blob/main/src/components/form/FormWrapper.js) component, is used to generate dynamically generated form fields.  
Under the hood, the i18next and react-i18next libraries were used to build the [LanguagePicker](https://github.com/rangoc/Registration-Form/blob/main/src/pages/registration/Registration.js#L90) component, but in order to make it truly reusable, I created my own context API, [MultiLanguageSupport](https://github.com/rangoc/Registration-Form/blob/9ea8d809dc469f62e9f3b33d9e55a9214728734d/src/context/MultiLanguageSupportProvider.js).

Thanks for a read!<br/>
![Looney Tunes](https://media.giphy.com/media/5IT69msgpaOcg/giphy.gif)
