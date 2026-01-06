from app.services.url_analyzer import analyze_url
from app.services.scoring_engine import score_url
from app.services.scan_id import generate_scan_id

def merge_scan_results(url: str) -> dict:
    scan_id = generate_scan_id(url)

    base = analyze_url(url)
    base_analysis = {
        "score": base.score,
        "reason": base.reason,
    }

    final = score_url(
        url=url,
        base_analysis=base_analysis,
        urlscan_flagged=False
    )

    return {
        "id": scan_id,
        "url": url,
        "risk_level": final["risk_level"],
        "score": final["score"],
        "reasons": final["reasons"],
        "domain": final["domain"],
        "source": final["source"],
    }
