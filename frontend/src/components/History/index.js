import React from "react";

import "./styles.css";

function History({ session }) {
  return (
    <tr>
      <td>{session.startTime}</td>
      <td>{session.endTime}</td>
      <td>{session.ipAddress}</td>
      <td>{session.averageLatency}</td>
      <td>{session.packetLoss}</td>
      <td>{session.totalPackets}</td>
    </tr>
  );
}

export default History;
