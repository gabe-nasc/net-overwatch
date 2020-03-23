var ping = require("jjg-ping");

const hosts = ["1.1.1.1", "192.168.20.1", "google.com:81", "globo.com"];

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

function transformData(data) {
  var avg = 0;
  var loss = 0;
  var successes = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] != -1) {
      successes += 1;
      avg += (data[i] - avg) / successes;
    } else {
      loss += 1;
    }
  }

  for (let i = 0; i < successes.length; i++) {
    avg += (successes[i] - avg) / i + 1;
  }

  return [avg, loss, successes];
}

// Still gotta think of a description for this one [0]
async function managePings(hosts) {
  let responses = {};

  for (let i = 0; i < hosts.length; i++) {
    responses[hosts[i]] = [];
  }

  for (let i = 0; i < 60; i++) {
    console.log("i: " + i);

    for (let j = 0; j < hosts.length; j++) {
      try {
        const response = await getLatency(hosts[j]);
        responses[hosts[j]].push(response);
        console.log(`${i} - ${hosts[j]}: ${response}`);
      } catch (err) {
        console.log(`${i} - ${hosts[j]}: Falhou`);
        responses[hosts[j]].push(-1);
      }
    }
    await new Promise(r => setTimeout(r, 500));
  }

  for (let i = 0; i < hosts.length; i++) {
    console.log(transformData(responses[hosts[i]]));
  }
}

// [1]
async function main() {
  // while (1) {
  managePings(hosts);
  // }
}

main();
