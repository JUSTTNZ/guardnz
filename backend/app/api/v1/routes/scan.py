from fastapi import APIRouter, HTTPException
from app.schemas.scan import ScanRequest, ScanResult
from app.services.url_analyzer import analyze_url
from app.services.supabase_client import save_scan_result
import json

router = APIRouter()

@router.post("/scan", response_model=ScanResult)
def scan_url(payload: ScanRequest):
    """
    Scan a URL for potential phishing risks and save to database
    """
    try:
        # Analyze the URL
        result = analyze_url(payload.url)
        
        # Print to terminal
        print("\n" + "="*50)
        print("SCAN RESULT:")
        print(json.dumps(result.model_dump(), indent=2, default=str))
        print("="*50 + "\n")
        
        # Save to Supabase
        save_scan_result(result)
        
        return result
        
    except Exception as e:
        print(f"Error during scan: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Scan failed: {str(e)}")