import logging
import requests
from core.config import settings

URLSCAN_SUBMIT_URL = "https://urlscan.io/api/v1/scan/"

HEADERS = {
    "API-Key": settings.URLSCAN_API_KEY.strip(),
}

def submit_deep_scan(url: str) -> str:
    logger = logging.getLogger(__name__)
    logger.info("URLSCAN_API_KEY = %s", settings.URLSCAN_API_KEY)

    payload = {
        "url": url,
        "visibility": "public"
    }

    logger.info("Request payload: %s", payload)
    logger.info("Request headers: %s", HEADERS)

    response = requests.post(
        URLSCAN_SUBMIT_URL,
        headers=HEADERS,
        json=payload,
        timeout=15,
        verify=False  # required on Windows
    )

    logger.info("Response status code: %d", response.status_code)
    logger.info("Response body: %s", response.text)

    response.raise_for_status()

    data = response.json()
    return data["uuid"]
