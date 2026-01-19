from fastapi import APIRouter, HTTPException
from app.services.supabase_client import get_scan_by_id, get_scan_evidence
from app.services.urlscan_results import fetch_urlscan_result
from app.services.urlscan_parser import parse_urlscan
from app.services.supabase_client import save_scan

router = APIRouter()

@router.get("/scan/evidence/{scan_id}")
def get_scan_evidence_endpoint(scan_id: str):
    # 1. Fetch the scan by ID
    try:
        scan = get_scan_by_id(scan_id)
        print(f"[evidence] fetched scan | scan_id={scan_id} risk_level={scan.get('risk_level')} deep_scan_required={scan.get('deep_scan_required')}")
    except Exception as e:
        print(f"[evidence] scan not found | scan_id={scan_id}: {str(e)}")
        raise HTTPException(status_code=404, detail="Scan not found")

    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    # 2. Check if deep scan was required (i.e., will be triggered)
    if not scan.get("deep_scan_required"):
        print(f"[evidence] deep scan not required | scan_id={scan_id}")
        raise HTTPException(status_code=404, detail="No deep scan was triggered for this scan")

    # 3. Get evidence to retrieve UUID
    evidence = get_scan_evidence(scan_id)
    print(f"[evidence] fetched evidence | scan_id={scan_id} evidence={evidence}")
    if not evidence:
        return {"status": "pending", "provider": "urlscan"}

    # 4. If already completed, return parsed evidence
    if scan.get("deep_scan_completed"):
        return evidence

    # 5. Fetch result from urlscan
    try:
        uuid = evidence["external_id"]
        print(f"[urlscan] result fetched | scan_id={scan_id} uuid={uuid}")
        result = fetch_urlscan_result(uuid)
        parsed = parse_urlscan(result)

        # 6. Save parsed evidence (update evidence row with parsed data)
        # For simplicity, we'll store the parsed data in the evidence table or return it directly
        # Assuming evidence table can store JSON data
        evidence_data = {
            "provider": "urlscan",
            **parsed
        }

        # Mark scan as completed
        scan["deep_scan_completed"] = True
        save_scan(scan)  # This will update the scan

        print(f"[urlscan] evidence saved | scan_id={scan_id}")

        return evidence_data

    except Exception as e:
        print(f"[urlscan] fetch failed: {str(e)}")
        return {"status": "pending", "provider": "urlscan"}
