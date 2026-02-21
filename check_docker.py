import subprocess
import json

def get_docker_status():
    try:
        result = subprocess.run(
            ["docker", "ps", "--format", "{{json .}}"],
            capture_output=True,
            text=True,
            check=True
        )
        containers = [json.loads(line) for line in result.stdout.strip().split("\n") if line]
        for c in containers:
            print(f"{c['Names']} | {c['Status']} | {c['Ports']}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_docker_status()
