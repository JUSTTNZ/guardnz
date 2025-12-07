from fastapi import APIRouter
from app.schemas.scan import ScanRequest, ScanResult
from app.services.url_analyzer import analyze_url

router = APIRouter(tags=["Scan"])


@router.post("/scan", response_model=ScanResult)
async def scan_url(payload: ScanRequest):
    """Analyze a URL and return potential risk data."""
    return analyze_url(payload.url)
