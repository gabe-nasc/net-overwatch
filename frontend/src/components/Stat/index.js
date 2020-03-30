import React from "react";

import "./styles.css";

function Stat({ session }) {
  return (
    <div className="sub-box">
      <p>{session.ipAddress}</p>
      <p>{session.averageLatency}</p>
    </div>
  );
}

export default Stat;
