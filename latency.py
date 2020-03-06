from datetime import datetime
from pythonping import ping

import time
import json
import os

# Class to help collect, log, and update data
class network_data(object):
    def __init__(self, ip_address, name=None):
        self.address = ip_address
        self.name = name

        self.packets = []  # All sent packets and at what time they were sent

        self.success = 0  # How many packets were successfully sent
        self.loss = 0  # How many packets were lost

        self.avg_latency = 0  # Average latency of successfull packets

    # Updates existing data
    def add(self, data):
        for latency, time in data:
            self.packets.append((latency, time))

            if latency == -1:
                self.loss += 1
                continue

            self.success += 1
            self.avg_latency += (latency - self.avg_latency) / self.success

    # Collects connection data using ping and self.address
    def collect(self, n_times=5, packet_size=64):
        response = ping(self.address, count=n_times, size=packet_size)

        elapsed = str(datetime.now())
        data = []
        for r in response:
            if r.success:
                data.append((r.time_elapsed_ms, elapsed))
            else:
                data.append((-1, elapsed))

        self.add(data)


def load_address():
    data = ""
    with open("config.json", "r") as f:
        data = json.load(f)

    return data


def main():
    info = load_address()
    collectors = [network_data(ip_address, name) for name, ip_address in info.items()]
    while True:
        for c in collectors:
            c.collect()
            print(
                f"{c.name} -> Average Latency: {c.avg_latency:.2f} | Packet Loss: {c.loss:.2f}%"
            )

        time.sleep(1)
        os.system("clear")


if __name__ == "__main__":
    main()
