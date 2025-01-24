import { useState } from 'react';

function MedalFrom({ countryList, setCountryList }) {
  // 입력 칸
  const [formData, setFormData] = useState({
    country: '',
    gold: '',
    silver: '',
    bronze: '',
  });

  // 중복된 국가명이 있는지 확인
  const duplicationCountry = countryList.some(
    (entry) =>
      entry.country.toLowerCase().trim() ===
      formData.country.toLowerCase().trim()
  );

  // 수정하는 함수
  const medalEditItem = () => {
    if (duplicationCountry) {
      countryList.map((country) => {
        if (country.country === formData.country) {
          country.gold = formData.gold;
          country.silver = formData.silver;
          country.bronze = formData.bronze;
        }
      });
      countryList.sort((a, b) => {
        if (b.gold !== a.gold) {
          return b.gold - a.gold; // 금메달 기준 내림차순
        } else if (b.silver !== a.silver) {
          return b.silver - a.silver; // 은메달 기준 내림차순
        } else {
          return b.bronze - a.bronze; // 동메달 기준 내림차순
        }
      });
      alert(`${formData.country} 국가의 메달 정보가 수정되었습니다.`);
    } else {
      alert('해당 국가를 찾을 수 없습니다.');
      return;
    }
    // formData 초기화
    setFormData({
      country: '',
      gold: '',
      silver: '',
      bronze: '',
    });
  };

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
    setCountryList(
      [...countryList, formData].sort((a, b) => {
        if (b.gold !== a.gold) {
          return b.gold - a.gold; // 금메달 기준 내림차순
        } else if (b.silver !== a.silver) {
          return b.silver - a.silver; // 은메달 기준 내림차순
        } else {
          return b.bronze - a.bronze; // 동메달 기준 내림차순
        }
      })
    );
    // formData 초기화
    setFormData({
      country: '',
      gold: '',
      silver: '',
      bronze: '',
    });
  };

  return (
    <div className="olympic">
      <h1>2024 파리 올림픽</h1>
      <form className="input-group" onSubmit={handleSubmit}>
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

        <div className="medal-button">
          <button className="submission-form" type="submit">
            제출
          </button>

          <button
            className="submission-form"
            type="button"
            onClick={medalEditItem}
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
}

export default MedalFrom;
