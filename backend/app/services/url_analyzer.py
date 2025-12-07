import hashlib
from datetime import datetime
from typing import Tuple

from app.schemas.scan import RiskLevel, ScanResult

SUSPICIOUS_KEYWORDS = [
    "login",
    "verify",
    "update",
    "secure",
    "account",
    "gift",
    "free",
    "winner",
    "bonus",
    "click",
]

def _basic_rules(url: str) -> Tuple[RiskLevel, float, str]:
    url_lower = url.lower()

    https = url_lower.startswith("https://")
    keyword_hits = [kw for kw in SUSPICIOUS_KEYWORDS if kw in url_lower]
    long_query = "?" in url_lower and len(url_lower.split("?", 1)[1]) > 80

    score = 0.0
    reasons = []

    if not https:
        score += 0.4
        reasons.append("Non-HTTPS link")

    if keyword_hits:
        score += 0.3
        reasons.append(f"Suspicious terms: {', '.join(keyword_hits)}")

    if long_query:
        score += 0.2
        reasons.append("Unusually long query parameters")
    
    score = min(score, 1.0)
    
    if score >= 0.7:
        risk_level = RiskLevel.danger
    elif score >= 0.4:
        risk_level = RiskLevel.warning
    else:
        risk_level = RiskLevel.safe
    
    reason_text = "; ".join(reasons) if reasons else "No obvious red flags detected"
    return risk_level, score, reason_text

def analyze_url(url) -> ScanResult:
    # Convert HttpUrl to string at the beginning
    url_str = str(url)
    
    scan_id = hashlib.sha256(url_str.encode()).hexdigest()
    risk, score, reason = _basic_rules(url_str)

    return ScanResult(
        id=scan_id,
        url=url_str,
        risk_level=risk,
        score=score,
        reason=reason,
        created_at=datetime.utcnow(),
    )