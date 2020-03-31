import React from "react";
// import Math from "Math";

import "./styles.css";

function Stat({ session }) {
  function convertDate(date) {
    const dateObj = new Date(date);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };

    return dateObj.toLocaleDateString("pt-BR", options);
  }
  return (
    <div className="sub-box">
      <h1>{session.ipAddress}</h1>
      <ul>
        <li>
          <b>Average Latency:</b>{" "}
          {Math.round(session.averageLatency * 100) / 100}
        </li>
        <li>
          <b>Running Since:</b> {convertDate(session.startTime)}
        </li>
        <li>
          <b>Total Packets Sent:</b> {session.totalPackets}
        </li>
        <li>
          <b>Packet Loss:</b> {session.packetLoss}
        </li>
      </ul>
    </div>
  );
}

export default Stat;
