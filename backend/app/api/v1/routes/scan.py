from fastapi import APIRouter, HTTPException
from app.api.v1.services.scanner import merge_scan_results
from app.services.deep_scan_trigger import trigger_deep_scan_async
from app.services.supabase_client import save_scan, save_scan_evidence



# 🔴 FILE LOAD CONFIRMATION (VERY IMPORTANT)
print(">>> LOADED SCAN ROUTE FILE <<<")

router = APIRouter()

AUTO_DEEP_SCAN_LEVELS = {"warning", "danger"}

@router.post("/scan")
def scan_url(payload: dict):
    # 🔴 ENDPOINT HIT CONFIRMATION
    print(">>> SCAN ENDPOINT HIT <<<")

    try:
        url = payload.get("url")
        if not isinstance(url, str) or not url.strip():
            raise HTTPException(status_code=400, detail="URL is required")

        url = url.strip()

        # 1. Main scan
        result = merge_scan_results(url)
        save_scan(result)

        if result["risk_level"] in AUTO_DEEP_SCAN_LEVELS:
            print(f"[scan] triggering deep scan for scan_id={result['id']}")
            trigger_deep_scan_async(url, result["id"])

        else:
            print("DEEP SCAN NOT REQUIRED")

        return result

    except Exception as e:
        print("SCAN ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
