import React from "react";
// import Math from "Math";

import "./styles.css";

function Stat({ session }) {
  return (
    <div className="sub-box">
      <h1>{session.ipAddress}</h1>
      <ul>
        <li>
          Average Latency: {Math.round(session.averageLatency * 100) / 100}
        </li>
        <li>Running Since: {session.startTime}</li>
        <li>Total Packets Sent: {session.totalPackets}</li>
        <li>Packet Loss: {session.packetLoss}</li>
      </ul>
    </div>
  );
}

export default Stat;
