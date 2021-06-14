import React, { useContext } from 'react';
import { MultiLanguageSupportContext } from 'context/MultiLanguageSupportProvider';
import croatia from 'assets/croatia.svg';
import unitedKingdom from 'assets/united-kingdom.svg';

import './languagePicker.scss';
const LanguagePicker = () => {
  const { setLanguage } = useContext(MultiLanguageSupportContext);
  return (
    <>
      <div className="languageSelector-en" onClick={() => setLanguage('en')}>
        <img src={unitedKingdom} alt="English Language" />
      </div>
      <div className="languageSelector-hr" onClick={() => setLanguage('hr')}>
        <img src={croatia} alt="Croatia Language" />
      </div>
    </>
  );
};

export default LanguagePicker;
