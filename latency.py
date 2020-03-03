from pythonping import ping

import json


def load_address():
    data = ""
    with open("config.json", "r") as f:
        data = json.load(f)

    return data


def extract_from_ping(address):
    response = ping(address, count=5, size=64)
    data = {"avg": 0, "loss": 0}

    for r in response:
        data["avg"] += round(r.time_elapsed_ms / 5, 2)

        if not r.success:
            data["loss"] += round(1 / 5, 2)

    return data


def main():
    info = load_address()
    while True:
        for name, address in info.items():
            data = extract_from_ping(address)
            avg = data["avg"]
            loss = data["loss"]

            print(f"{name} -> Average Latency: {avg:.2f} | Packet Loss: {loss:.2f}%")

        break


if __name__ == "__main__":
    main()
