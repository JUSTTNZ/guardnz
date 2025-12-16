from typing import Dict, Any, List
from app.services.url_analyzer import analyze_url
from app.api.v1.services.google_lookup import check_safe_browsing


def _map_score_to_risk_level(score: int) -> str:
    if score >= 70:
        return "malicious"
    if score >= 40:
        return "warning"
    return "clean"


def merge_scan_results(url: str) -> Dict[str, Any]:
    """
    Hybrid scan:
    - Heuristics (local)
    - Google Safe Browsing (authoritative)
    """

    reasons: List[str] = []

    # 1. Run heuristic analysis
    heuristic_result = analyze_url(url)

    # Your current heuristic score seems to be 0–1
    heuristic_score = heuristic_result.score
    score = int(heuristic_score * 100)

    if heuristic_result.reason:
        reasons.append(heuristic_result.reason)

    # 2. Run Google Safe Browsing
    sb_result = check_safe_browsing(url)

    if sb_result.get("success") and sb_result.get("matches"):
        reasons.append("Flagged by Google Safe Browsing")

        threat_types = {
            m.get("threatType")
            for m in sb_result.get("matches", [])
            if m.get("threatType")
        }

        if threat_types:
            reasons.append(f"Threat types: {', '.join(threat_types)}")

        # Safe Browsing dominates
        score = max(score, 95)

    risk_level = _map_score_to_risk_level(score)

    if not reasons:
        reasons.append("No suspicious indicators detected")

    return {
        "url": url,
        "risk_level": risk_level,
        "score": score,
        "reasons": reasons,
    }
