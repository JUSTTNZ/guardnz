def parse_urlscan(result: dict) -> dict:
    return {
        "final_url": result.get("page", {}).get("url"),
        "screenshot": result.get("task", {}).get("screenshotURL"),
        "domains_contacted": list(
            set(d["domain"] for d in result.get("network", {}).get("domains", []))
        )[:10],
        "verdict_score": result.get("verdicts", {}).get("overall", {}).get("score"),
    }
