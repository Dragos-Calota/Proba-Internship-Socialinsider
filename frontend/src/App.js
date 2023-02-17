import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [brands, setBrands] = useState([]);

  const selectHandle = useCallback(() => {
    fetch("http://localhost:8000/api/getBrands")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forEach((element) => {
          setBrands(brands.push(element.brandname));
        });
        console.log(brands);
      });
  }, [selectedDate]);

  return (
    <React.Fragment>
      <DatePicker
        selected={selectedDate}
        onSelect={selectHandle}
        onChange={(date) => setSelectedDate(date)}
      />
    </React.Fragment>
  );
}

export default App;
