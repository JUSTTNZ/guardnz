def analyze_redirect_behavior(domain_info: dict) -> dict:
    """
    Analyze redirect / indirection risk.
    """
    signals = []
    risk_score = 0

    if domain_info.get("is_shortener"):
        signals.append("URL shortener hides final destination")
        risk_score += 20

    return {
        "redirect_risk": risk_score,
        "redirect_signals": signals,
    }
