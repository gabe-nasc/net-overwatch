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

// Still gotta think of a description for this one [0]
async function managePings(hosts) {
  for (let i = 0; i < hosts.length; i++) {
    try {
      const response = await getLatency(hosts[i]);
      console.log(hosts[i] + " : " + response);
    } catch (err) {
      console.log(hosts[i] + " went apeshit");
    }
  }
}

// [1]
async function main() {
  while (1) {
    console.log("wut");
    pingAddresses(hosts);
    await new Promise(r => setTimeout(r, 1000));
  }
}

main();
