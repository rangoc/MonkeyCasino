import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MultiLanguageSupportProvider } from 'context/MultiLanguageSupportProvider';
import 'utils/multiLanguageSupport';

import './index.scss';

ReactDOM.render(
  <MultiLanguageSupportProvider>
    <App />
  </MultiLanguageSupportProvider>,
  document.getElementById('root')
);
