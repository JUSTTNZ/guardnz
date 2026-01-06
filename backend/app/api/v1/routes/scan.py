from fastapi import APIRouter, HTTPException, Request
from app.api.v1.services.scanner import merge_scan_results
from app.services.deep_scan_trigger import trigger_deep_scan_async

router = APIRouter()

AUTO_DEEP_SCAN_LEVELS = {"warning", "danger"}

@router.post("/scan")
async def scan_url(request: Request):
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    url = data.get("url")

    if not isinstance(url, str) or not url.strip():
        raise HTTPException(status_code=400, detail="URL is required")

    url = url.strip()

    # Main scan
    result = merge_scan_results(url)

    # Phase 7: auto deep scan trigger
    if result["risk_level"] in AUTO_DEEP_SCAN_LEVELS:
        trigger_deep_scan_async(url, result["id"])


    return result
