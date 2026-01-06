BRANDS = ["facebook", "google", "paypal", "instagram", "apple", "microsoft"]

def detect_impersonation(domain: str) -> str | None:
    for brand in BRANDS:
        if brand in domain and not domain.endswith(f"{brand}.com"):
            return brand
    return None
