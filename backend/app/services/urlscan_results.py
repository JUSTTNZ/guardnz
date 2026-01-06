import requests
from core.config import settings

URLSCAN_RESULT_URL = "https://urlscan.io/api/v1/result/"

HEADERS = {
    "API-Key": settings.URLSCAN_API_KEY,
}

def fetch_urlscan_result(uuid: str) -> dict:
    response = requests.get(
        f"{URLSCAN_RESULT_URL}{uuid}/",
        headers=HEADERS,
        timeout=10
    )
    response.raise_for_status()
    return response.json()
