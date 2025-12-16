import os
import requests
from typing import Dict, Any

SAFE_BROWSING_ENDPOINT = "https://safebrowsing.googleapis.com/v4/threatMatches:find"


def check_safe_browsing(url: str) -> Dict[str, Any]:
    """
    Check a URL against Google Safe Browsing v4
    """
    api_key = os.getenv("SAFE_BROWSING_KEY")

    if not api_key:
        return {
            "success": False,
            "matches": [],
            "error": "SAFE_BROWSING_KEY not set"
        }

    payload = {
        "client": {
            "clientId": "guardnz",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }

    try:
        response = requests.post(
            f"{SAFE_BROWSING_ENDPOINT}?key={api_key}",
            json=payload,
            timeout=6
        )
        response.raise_for_status()

        data = response.json()
        return {
            "success": True,
            "matches": data.get("matches", []),
            "raw": data
        }

    except Exception as e:
        return {
            "success": False,
            "matches": [],
            "error": str(e)
        }
