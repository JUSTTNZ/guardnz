import tldextract

KNOWN_PLATFORMS = {
    "facebook.com": "Facebook",
    "fb.com": "Facebook",
    "instagram.com": "Instagram",
    "google.com": "Google",
    "docs.google.com": "Google Docs",
    "forms.gle": "Google Forms",
    "paypal.com": "PayPal",
    "x.com": "X (Twitter)",
    "twitter.com": "X (Twitter)",
}

URL_SHORTENERS = {
    "bit.ly", "t.co", "tinyurl.com", "goo.gl", "is.gd"
}

def analyze_domain(url: str) -> dict:
    ext = tldextract.extract(url)
    registered_domain = f"{ext.domain}.{ext.suffix}"

    return {
        "registered_domain": registered_domain,
        "subdomain": ext.subdomain,
        "platform": KNOWN_PLATFORMS.get(registered_domain),
        "is_shortener": registered_domain in URL_SHORTENERS,
    }
