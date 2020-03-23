var ping = require("jjg-ping");
var axios = require("axios");

const hosts = ["1.1.1.1", "192.168.20.1", "google.com:81", "globo.com"];
// const hosts = ["1.1.1.1"];

const sessionStartTime = new Date();
const sessionId = {};

var isNewSession = true;

// Save a session to a database
async function saveSessionToDB(loss, total, avg, ip) {
  const data = {
    ipAddress: ip,

    startTime: sessionStartTime,
    endTime: new Date(),

    packetLoss: loss,
    totalPackets: total,
    averageLatency: avg
  };

  if (isNewSession) {
    const response = await axios.post(
      "http://localhost:3001/api/sessions",
      data
    );

    // resolve(response);
    sessionId[ip] = response["_id"];
  } else {
    const response = await axios.put(
      `http://localhost:3001/api/sessions/${sessionId[ip]}`,
      data
    );
    // resolve(response);
  }
}

// Pings the provided IP Address
const getLatency = function(host) {
  return new Promise((resolve, reject) => {
    ping.system.ping(host, function(latency, status) {
      if (status) {
        resolve(latency);
      } else {
        reject(latency);
      }
    });
  });
};

function prepareData(packets, ip, total) {
  var avg = 0;
  var loss = 0;
  var successes = 0;

  for (let i = 0; i < packets.length; i++) {
    if (packets[i] != -1) {
      successes += 1;
      avg += (packets[i] - avg) / successes;
    } else {
      loss += 1;
    }
  }

  return [loss, total, avg, ip];
}

// Still gotta think of a description for this one [0]
async function managePings(hosts) {
  let responses = {};

  for (let i = 0; i < hosts.length; i++) {
    responses[hosts[i]] = [];
  }

  for (let i = 0; i < 60; i++) {
    // console.log("i: " + i);

    for (let j = 0; j < hosts.length; j++) {
      try {
        const response = await getLatency(hosts[j]);
        responses[hosts[j]].push(response);
        // console.log(`${i} - ${hosts[j]}: ${response}`);
      } catch (err) {
        // console.log(`${i} - ${hosts[j]}: Falhou`);
        responses[hosts[j]].push(-1);
      }
    }
    await new Promise(r => setTimeout(r, 500));
  }

  for (let i = 0; i < hosts.length; i++) {
    try {
      const response = await saveSessionToDB(
        ...prepareData(responses[hosts[i]], hosts[i], 60)
      );
    } catch (error) {
      console.log(error);
    }
  }
  isNewSession = false;
}

// [1]
async function main() {
  // while (1) {
  managePings(hosts);
  // }
}

main();
