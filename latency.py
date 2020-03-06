from datetime import datetime
from pythonping import ping

import time
import json
import os

# Class to help organize, log, and update collected network data
class network_data(object):
    def __init__(self, ip_address):
        self.address = ip_address
        self.packets = []  # All sent packets and at what time they were sent

        self.success = 0  # How many packets were successfully sent
        self.loss = 0  # How many packets were lost

        self.avg_latency = 0  # Average latency of successfull packets

    # Method to update existing data
    def add(self, data):
        total_latency = 0
        for latency, time in data:
            self.packets.append((latency, time))

            if latency == -1:
                self.loss += 1
                continue

            self.success += 1
            total_latency += latency

        self.avg_latency += (total_latency - self.avg_latency) / self.success

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
    while True:
        for name, address in info.items():
            data = extract_from_ping(address)
            avg = data["avg"]
            loss = data["loss"]

            print(f"{name} -> Average Latency: {avg:.2f} | Packet Loss: {loss:.2f}%")

        time.sleep(1)
        os.system("clear")


if __name__ == "__main__":
    main()
