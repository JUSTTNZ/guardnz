from fastapi import APIRouter, HTTPException
from app.schemas.scan import ScanRequest, ScanResult
from app.services.scanner import merge_scan_results
import json

router = APIRouter()

@router.post("/scan", response_model=ScanResult)
def scan_url(payload: ScanRequest):
    """
    Scan a URL for potential phishing risks
    Phase 4: Detection only (no persistence)
    """
    try:
        # Analyze the URL
        result = merge_scan_results(str(payload.url))

        # Print to terminal (debug)
        print("\n" + "=" * 50)
        print("SCAN RESULT:")
        print(json.dumps(result.model_dump(), indent=2, default=str))
        print("=" * 50 + "\n")

        return result

    except Exception as e:
        print(f"Error during scan: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Scan failed: {str(e)}"
        )
