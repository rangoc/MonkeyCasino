# Demo: 
[Monkey Casino](https://monkey-casino-registration.netlify.app/)

# Screenshots: 
###### Desktop:  
[First step](https://i.imgur.com/ekbSTuM.png)  
[Second step](https://i.imgur.com/Ma4Etjl.png)  
[Registration in process](https://i.imgur.com/Y4QGcoT.png)  
[Goal](https://i.imgur.com/M9qHulY.png)  
###### Mobile
[First step](https://i.imgur.com/JeHQDCB.png)

# How to run
`git clone` the project locally  
`yarn install` to install all the dependencies  
`yarn start` to run the project in your browser


# Project overview ( Monkey Casino )
#### Functional requirements:
Client requested for a multi-step registration form, that will have dynamic input fields & dynamic validation created from sample [json schema](https://github.com/rangoc/Registration-Form/blob/main/src/sampleData.json) simulating type of data structure coming from their own backend server. The requirements for multi-step validation were to not allow a user reach 2nd step of registration without first clearing the 1st step and to have a visual "approval" when a user does so. Language switch should also be added allowing you to choose between 2 options ( currently ): `english` or `croatian`. Form should be responsive and looking appropriate on all screen sizes: mobile, tablet, laptop, desktop.   

#### Visual requirements: 
Client requested for visual aspects of his websites to "scream MONKEYS!!!" as he really loves them and asked for a registration page ( form ) to have vivid colors. Everything else is left to imagination and creativity. 

#### Deadline: 7 days
## Implementation & Thought process: 
#### Visuals:

##### Assets & color palette: 
Due to the client requesting for monkeys to be a key visual of the website, first I had to find the right assets to use ( illustrations, images ) e.g.  [monkey](https://github.com/rangoc/Registration-Form/blob/main/src/assets/monkey.png), [monkeyLogo](https://github.com/rangoc/Registration-Form/blob/main/src/assets/monkeyLogo.png) and it was very important for those assets to be "flat" and not have a "3d" feeling to them, because It wasn't the style I was going for as an end-goal. I already decided that the whole website/form will have a cartoonish look with vivid colors and those images fit perfectly ( it's worthy mentioning that it's really important to work with assets that have transarent background, because they are really "flexible" when it comes to playing along with your own custom color-schemes and palettes). As for the color palette I decided to go with green/yellow as they are best representatives of the jungle/bananas which are both connected to monkeys, and those colors fit perfectly with brown-ish color of my key assets.  
##### Background: 
Once I was set on assets & palette, I decided that for a background I would have a smooth progressive linear gradient, starting from bottom left to top right, progressing from green to yellow respectively, with bottom left corner being the darkest and top right corner being the lightest point of website ( simulating the point from where the main light source is coming, that later on would decide where the shadow would be cast ).
I wanted for [monkey](https://github.com/rangoc/Registration-Form/blob/main/src/assets/monkey.png) to be spread horizontally, repeating themselves, trying to make them look just like in real life, where they are usually seen in groups following each other.

##### Form: 
For a form, considering that after all, this is something that will be used for Casino ( and casinos are 18+ due to them revolving around gambling ), I had to choose a dark
color, to give off the impression of seriousness, as a primary color and integrate green color as a secondary color ( to still respect that "vivid colors" requirement). Also, considering that the light source was coming from the top right corner, here I also went with a linear gradient from bottom left to top right corner, and added a box shadow on left side just so I could make it stand out from the background and make it "come alive". 
###### Form Layout: 
Form should have some sort of header where there will be a logo of the app and also Language Switch. 
On bigger screens (laptop, desktop) I decided to go with horizontal layout, splitting the form into 2 sections vertically, where left section was going to be used for an animation ( to raise the level of interactivity ), and right section was going to be used for form fields and stepper ( who will display correct steps of multi-step validation).
On smaller screens layout would be vertical, with the order of components being: header, animation, form fields.
The animation that I was going for was definitely going to be something about casinos, just so I could fortify the meaning behind form, clearly showing to the user that this is a registration form for a CASINO. [Lottie files](https://github.com/rangoc/Registration-Form/blob/main/src/assets/lotties/dice.json) ( animations ) are perfect for web, as they are optimized and they really play along with the rest of a design.
That's pretty much it, everything else are just small designer touches which are kinda subjective to the taste, like: fonts, styles of input fields, buttons, letters and can be all found in sass files, in code, without me having to go in-depth about all those small things.
#### Functions:
I will try to keep this one short, and just give the general overview of functionalities and how I implemented them, for more in-depth overview of course there's the code :grin:

##### Structure: 
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
Inside of App component, I am rendering `Registration` component from [pages/registration](https://github.com/rangoc/Registration-Form/tree/main/src/pages/registration), which is using a custom hook `useFormAndValidation`, and that hook is returning ( after first parsing [json schema](https://github.com/rangoc/Registration-Form/blob/main/src/sampleData.json) ) `formData` and `validationSchema`, first one being used as `initialValues`, second one being used as `validationSchema`, for a [FormWrapper](https://github.com/rangoc/Registration-Form/blob/main/src/pages/registration/Registration.js#L112) component (using under the hud Formik - form & forms field library with it's own interal context api management and has great support for Yup validation library). Inside of `FormWrapper` component is [RegistrationForm](https://github.com/rangoc/Registration-Form/blob/9ea8d809dc469f62e9f3b33d9e55a9214728734d/src/pages/registration/components/RegistrationForm.js#L23) component which is used for generating dynamically form fields. 
For implementation of  [LanguagePicker](https://github.com/rangoc/Registration-Form/blob/main/src/pages/registration/Registration.js#L90) ( switcher ) component , i18next & react-i18next libraries were used under the hud, but in order to make component really reusable I implemented a context api of my own [MultiLanguageSupport](https://github.com/rangoc/Registration-Form/blob/9ea8d809dc469f62e9f3b33d9e55a9214728734d/src/context/MultiLanguageSupportProvider.js). 








