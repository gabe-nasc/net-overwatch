import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.css";

function Stat({ session }) {
  // const [stat, setStat] = useState(JSON.stringify(new Date()));
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     async function fetchData() {
  //       const dbData = await axios.get("http://localhost:3001/api/sessions");
  //       const dataLenght = Object.keys(dbData.data).length;

  //       const dbAverage = dbData.data[dataLenght - 1].averageLatency;
  //       console.log(dbAverage);
  //       if (clock !== dbAverage) {
  //         setStat(dbAverage);
  //       }
  //     }
  //     fetchData();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [clock]);

  return (
    <div className="sub-box">
      <p>{session.ipAddress}</p>
      <p>{session.averageLatency}</p>
    </div>
  );
}

export default Stat;
