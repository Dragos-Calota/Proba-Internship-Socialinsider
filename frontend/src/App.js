import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./App.module.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timestamp, setTimestamp] = useState(0);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (timestamp !== 0) {
      console.log(timestamp);
      document.getElementById("tableBody").innerHTML = null;
      fetch(`http://localhost:8000/api/getBrands/${timestamp}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.forEach((element) => {
            setBrands((prev) => [...prev, element]);
          });
        });
    }
  }, [timestamp]);

  return (
    <React.Fragment>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setTimestamp(date.getTime());
        }}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <td className={styles.td}>Brand Name</td>
            <td className={styles.td}>Total Profiles</td>
            <td className={styles.td}>Total Fans</td>
            <td className={styles.td}>Total Engagement</td>
          </tr>
        </thead>

        <tbody id="tableBody">
          {brands.map((brand, key) => {
            return (
              <tr key={key}>
                <td className={styles.td}>{brand.brandName}</td>
                <td className={styles.td}>{brand.numberOfProfiles}</td>
                <td className={styles.td}>{brand.totalFans}</td>
                <td className={styles.td}>{brand.totalEngagements}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default App;
