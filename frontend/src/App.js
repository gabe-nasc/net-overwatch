import React, { useState, useEffect } from "react";

import History from "./components/History";
import AddHost from "./components/AddHost";
import Header from "./components/Header";
import Stat from "./components/Stat";

import "./styles.css";
import axios from "axios";

function App() {
  const [currentSessions, setCurrentSessions] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchCurrentSessions() {
        const dbCurrent = await axios.get("http://localhost:3001/api/current");
        setCurrentSessions(dbCurrent.data);
      }
      fetchCurrentSessions();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSessions]);

  useEffect(() => {
    async function fetchSessions() {
      const sessions = await axios.get("http://localhost:3001/api/sessions");
      sessions.data.sort((a, b) => (a.startTime > b.startTime ? -1 : 1));
      setSessions(sessions.data);
    }
    fetchSessions();
  }, []);

  return (
    <div id="App">
      <Header />
      <div id="main-box">
        <div className="row" id="upper-row">
          {currentSessions.map(session => (
            <Stat key={session._id} session={session} />
          ))}
        </div>
        <div className="row" id="middle-row">
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>IP Address</th>
                <th>Average Latency</th>
                <th>Packet Loss</th>
                <th>Total Packets Sent</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 10).map(session => (
                <History key={session._id} session={session} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="row" id="bottom-row">
          <AddHost />
        </div>
      </div>
    </div>
  );
}

export default App;
