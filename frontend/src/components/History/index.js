import React from "react";

import "./styles.css";

function History({ session }) {
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
    <tr>
      <td>{convertDate(session.startTime)}</td>
      <td>{convertDate(session.endTime)}</td>
      <td>{session.ipAddress}</td>
      <td>{Math.round(session.averageLatency * 100) / 100}</td>
      <td>{session.packetLoss}</td>
      <td>{session.totalPackets}</td>
    </tr>
  );
}

export default History;
