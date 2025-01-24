import { useState } from 'react';

import './App.css';
import MedalList from './components/List';
import MedalFrom from './components/Form';

function App() {
  // 국가 목록 상태 설정
  const [countryList, setCountryList] = useState([]);

  return (
    <>
      <MedalFrom countryList={countryList} setCountryList={setCountryList} />
      <div id="medal-list">
        <MedalList countryList={countryList} setCountryList={setCountryList} />
      </div>
    </>
  );
}

export default App;
