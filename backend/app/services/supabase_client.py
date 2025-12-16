from supabase import create_client, Client
from core.config import settings
from app.schemas.scan import ScanResult

def get_supabase() -> Client:
    return create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_ROLE_KEY
    )

def save_scan_result(scan_result: ScanResult) -> dict:
    supabase = get_supabase()

    data = {
        "id": scan_result.id,
        "url": str(scan_result.url),
        "risk_level": scan_result.risk_level,
        "score": scan_result.score,
        "reason": scan_result.reason,
        "created_at": scan_result.created_at.isoformat(),
    }

    return supabase.table("scans").insert(data).execute().data
