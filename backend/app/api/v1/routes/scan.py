from fastapi import APIRouter, HTTPException
from app.schemas.scan import ScanRequest
from app.api.v1.services.scanner import merge_scan_results

router = APIRouter()

@router.post("/scan")
def scan_url(payload: ScanRequest):
    """
    Phase 4: Hybrid detection only (no persistence)
    """
    try:
        result = merge_scan_results(str(payload.url))
        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Scan failed: {str(e)}"
        )
