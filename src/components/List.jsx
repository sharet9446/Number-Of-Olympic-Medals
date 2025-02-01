function MedalList({ countryList, setCountryList }) {
  // 삭제하는 함수
  const medalRemoveItem = (deleteCountry) => {
    setCountryList(
      countryList.filter((medal) => medal.country !== deleteCountry)
    );
    alert(deleteCountry + ' 국가가 삭제되었습니다.');
  };

  return (
    <div className="medal-table">
      <h2>메달 순위</h2>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>국가명</th>
              <th className="medal-th">금메달</th>
              <th className="medal-th">은메달</th>
              <th className="medal-th">동메달</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {countryList.map(({ country, gold, silver, bronze }, index) => (
              <tr key={country}>
                <td>{index + 1}위</td>
                <td>{country}</td>
                <td>{gold}</td>
                <td>{silver}</td>
                <td>{bronze}</td>
                <td className="delete-td">
                  <button
                    className="delete-btn"
                    onClick={() => medalRemoveItem(country)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedalList;
