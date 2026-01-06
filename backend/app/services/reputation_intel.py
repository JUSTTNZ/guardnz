# High-trust platforms (very low risk)
HIGH_TRUST_DOMAINS = {
    "google.com",
    "facebook.com",
    "instagram.com",
    "paypal.com",
    "apple.com",
    "microsoft.com",
    "amazon.com",
    "x.com",
    "twitter.com",
}

# Common public services (neutral)
COMMON_SERVICES = {
    "forms.gle",
    "docs.google.com",
    "github.com",
    "linkedin.com",
    "youtube.com",
}

def analyze_reputation(registered_domain: str) -> dict:
    """
    Analyze reputation signals for a domain.
    """
    signals = []
    risk_score = 0

    if registered_domain in HIGH_TRUST_DOMAINS:
        signals.append("Well-known trusted domain")
        risk_score -= 10

    elif registered_domain in COMMON_SERVICES:
        signals.append("Common public service")
        risk_score += 0

    else:
        signals.append("Unknown or newly observed domain")
        risk_score += 10

    return {
        "reputation_risk": risk_score,
        "reputation_signals": signals,
    }
