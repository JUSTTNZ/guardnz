from fastapi import APIRouter, HTTPException, Request
from app.api.v1.services.scanner import merge_scan_results

router = APIRouter()

@router.post("/scan")
async def scan_url(request: Request):
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    url = data.get("url")

    if not isinstance(url, str) or not url.strip():
        raise HTTPException(status_code=400, detail="URL is required")

    result = merge_scan_results(url.strip())
    return result
