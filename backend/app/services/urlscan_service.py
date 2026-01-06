import requests
from core.config import settings

URLSCAN_SUBMIT_URL = "https://urlscan.io/api/v1/scan/"

HEADERS = {
    "API-Key": settings.URLSCAN_API_KEY,
    "Content-Type": "application/json",
}

def submit_deep_scan(url: str) -> str:
    payload = {
        "url": url,
        "visibility": "public"  # REQUIRED
    }

    response = requests.post(
        URLSCAN_SUBMIT_URL,
        headers=HEADERS,
        json=payload,
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()
    return data["uuid"]
