from fastapi import APIRouter, HTTPException
from app.services.supabase_client import get_scan_by_id
from app.services.urlscan_results import fetch_urlscan_result
from app.services.urlscan_parser import parse_urlscan

router = APIRouter()

@router.get("/scan/evidence/{scan_id}")
def get_scan_evidence(scan_id: str):
    scan = get_scan_by_id(scan_id)

    if not scan or not scan.get("urlscan_uuid"):
        raise HTTPException(status_code=404, detail="No deep scan available")

    result = fetch_urlscan_result(scan["urlscan_uuid"])
    return parse_urlscan(result)
