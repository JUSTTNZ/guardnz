from fastapi import APIRouter
from app.schemas.scan import ScanRequest, ScanResult
from app.services.url_analyzer import analyze_url
import json

router = APIRouter()

@router.post("/scan", response_model=ScanResult)
def scan_url(payload: ScanRequest):
    result = analyze_url(payload.url)
    
    # Print to terminal
    print("\n" + "="*50)
    print("SCAN RESULT:")
    print(json.dumps(result.model_dump(), indent=2, default=str))
    print("="*50 + "\n")
    
    return result