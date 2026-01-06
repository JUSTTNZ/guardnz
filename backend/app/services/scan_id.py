import hashlib

def generate_scan_id(url: str) -> str:
    return hashlib.sha256(url.encode()).hexdigest()
