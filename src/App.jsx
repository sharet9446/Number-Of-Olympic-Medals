import { useState } from 'react'
import './App.css'

function App() {

  // 입력 칸
  const [formData, setFormData] = useState({
    country: "",
    gold: "",
    silver: "",
    bronze: "",
  })

  // 국가 목록 상태 설정
  const [countryList, setCountryList] = useState([])

  // 중복된 국가명이 있는지 확인
  const duplicationCountry = countryList.some((entry) => entry.country.toLowerCase().trim() === formData.country.toLowerCase().trim())

  // 입력하고 저장하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 중복된 국가명 경고
    if (duplicationCountry) {
      alert('이미 있는 국가입니다.');
      return;
    }

    // 국가명에 숫자가 포함된 경우 경고
    if (!isNaN(formData.country.trim())) {
      alert('국가명에는 숫자를 입력할 수 없습니다.');
      return;
    }

    // 국가 목록 업데이트 및 정렬
    setCountryList([...countryList, formData].sort((a, b) => {
      if (b.gold !== a.gold) {
        return b.gold - a.gold;  // 금메달 기준 내림차순
      } else if (b.silver !== a.silver) {
        return b.silver - a.silver;  // 은메달 기준 내림차순
      } else {
        return b.bronze - a.bronze;  // 동메달 기준 내림차순
      }
    })) 

    // formData 초기화
    setFormData({
      country: "",
      gold: "",
      silver: "",
      bronze: "",
    });
  }

  // 수정하는 함수
  const medalEditItem = () => {
    if (duplicationCountry) {
      countryList.map(country => {
        if (country.country === formData.country) {
          country.gold = formData.gold;
          country.silver = formData.silver;
          country.bronze = formData.bronze;
        }
      })
      countryList.sort((a, b) => {
        if (b.gold !== a.gold) {
          return b.gold - a.gold;  // 금메달 기준 내림차순
        } else if (b.silver !== a.silver) {
          return b.silver - a.silver;  // 은메달 기준 내림차순
        } else {
          return b.bronze - a.bronze;  // 동메달 기준 내림차순
        }
      })
      alert(`${formData.country} 국가의 메달 정보가 수정되었습니다.`);
    } else {
      alert('해당 국가를 찾을 수 없습니다.');
      return;
    }

    // formData 초기화
    setFormData({
      country: "",
      gold: "",
      silver: "",
      bronze: "",
    });
  }


  // 삭제하는 함수
  const medalRemoveItem = (deleteCountry) => {
    setCountryList(countryList.filter(medal => medal.country !== deleteCountry));
    alert(deleteCountry + ' 국가가 삭제되었습니다.');
  }

  return (
    <>
      <div className='olympic'>
        <h1>2024 파리 올림픽</h1>
        <form className='input-group' onSubmit={handleSubmit}>
          <div className="input">
            <label>국가명</label>
            <input
              type="text"
              placeholder="국가 입력"
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="input">
            <label>금메달</label>
            <input
              type="number"
              value={formData.gold}
              min="0"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gold: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="input">
            <label>은메달</label>
            <input
              type="number"
              value={formData.silver}
              min="0"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  silver: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="input">
            <label>동메달</label>
            <input
              type="number"
              value={formData.bronze}
              min="0"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bronze: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className='medal-button'>
            <button className='submission-form' type='submit'>제출</button>
            <button className='submission-form' type='button' onClick={medalEditItem}>수정</button>
          </div>
        </form>

      </div>
      <div id="medal-list">
        <MedalList countryList={countryList} setCountryList={setCountryList} medalRemoveItem={medalRemoveItem} />

      </div>
    </>
  )
}

export default App

function MedalList({ countryList, setCountryList, medalRemoveItem}) {
  const [sortOrder, setSortOrder] = useState('asc');

const medalThClick = (medal) => {
  setCountryList((prevList) => {
    const sortedList = [...prevList].sort((a, b) => 
      sortOrder === 'asc' ? a[medal] - b[medal] : b[medal] - a[medal]
    );
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    return sortedList;
  });
};

  return (
    <div className='medal-table'>
      <h2>메달 순위</h2>
      <div className='table-div'>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>국가명</th>
              <th className='medal-th' onClick={() => medalThClick('gold')}>금메달</th>
              <th className='medal-th'>은메달</th>
              <th className='medal-th'>동메달</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {countryList.map(({ country, gold, silver, bronze }, index) => (
              <tr key={index}>
                <td>{index + 1}위</td>
                <td>{country}</td>
                <td>{gold}</td>
                <td>{silver}</td>
                <td>{bronze}</td>
                <td className='delete-td'>
                  <button className="delete-btn" onClick={() => medalRemoveItem(country)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}