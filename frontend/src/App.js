import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Stat from "./components/Stat";

import "./styles.css";
import axios from "axios";

function App() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchCurrentSessions() {
        const dbSessions = await axios.get("http://localhost:3001/api/current");
        setSessions(dbSessions.data);
      }
      fetchCurrentSessions();
    }, 1000);
    return () => clearInterval(interval);
  }, [sessions]);

  return (
    <div id="App">
      <Header />
      <div id="main-box">
        <div className="column" id="left-column">
          {sessions.map(session => (
            <Stat key={session._id} session={session} />
          ))}
          {/* <div className="sub-box" name="left-column-box"></div>
          <div className="sub-box" name="left-column-box"></div>
          <div className="sub-box" name="left-column-box"></div>
          <div className="sub-box" name="left-column-box"></div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
