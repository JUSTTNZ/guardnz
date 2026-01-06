from app.services.domain_intel import analyze_domain
from app.services.impersonation import detect_impersonation
from app.services.redirect_awareness import analyze_redirect_behavior
from app.services.reputation_intel import analyze_reputation

def score_url(
    url: str,
    base_analysis: dict,
    urlscan_flagged: bool = False
) -> dict:
    """
    Combine all signals into a final risk score and explanation.
    """

    score = 0
    reasons = []

    # 1️⃣ Base URL structure signals
    score += base_analysis.get("score", 0)
    if base_analysis.get("reason"):
        reasons.append(base_analysis["reason"])

    # 2️⃣ Domain intelligence
    domain_info = analyze_domain(url)

    # 3️⃣ Redirect / shortener signals
    redirect_info = analyze_redirect_behavior(domain_info)
    score += redirect_info["redirect_risk"]
    reasons.extend(redirect_info["redirect_signals"])

    # 4️⃣ Brand impersonation
    impersonated_brand = detect_impersonation(domain_info["registered_domain"])
    if impersonated_brand:
        score += 30
        reasons.append(f"Possible {impersonated_brand.capitalize()} impersonation")

    # 5️⃣ Reputation & age signals
    reputation_info = analyze_reputation(domain_info["registered_domain"])
    score += reputation_info["reputation_risk"]
    reasons.extend(reputation_info["reputation_signals"])

    # 6️⃣ Behavioral sandbox (urlscan)
    if urlscan_flagged:
        score += 40
        reasons.append("Malicious behavior detected in sandbox analysis")

    # Normalize score
    score = max(0, min(score, 100))

    # Final risk level
    if score >= 60:
        risk_level = "danger"
    elif score >= 30:
        risk_level = "warning"
    else:
        risk_level = "safe"

    return {
        "risk_level": risk_level,
        "score": score,
        "reasons": reasons,
        "domain": domain_info["registered_domain"],
        "source": domain_info.get("platform"),
    }
