from supabase import create_client
from core.config import settings
from datetime import datetime

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY,
)


def save_scan(scan: dict):
    """
    Persist base scan result
    """
    supabase.table("scans").upsert({
        "id": scan["id"],
        "url": scan["url"],
        "domain": scan.get("domain"),
        "source": scan.get("source"),
        "risk_level": scan["risk_level"],
        "score": scan["score"],
        "reasons": scan["reasons"],
        "deep_scan_required": scan["risk_level"] != "safe",
        "deep_scan_started": False,
        "deep_scan_completed": False,
        "created_at": datetime.utcnow().isoformat(),
    }).execute()


def save_scan_evidence(scan_id: str, provider: str, external_id: str):
    # Set deep_scan_started on scans table
    supabase.table("scans").update({
        "deep_scan_started": True,
    }).eq("id", scan_id).execute()

    # Insert evidence row
    supabase.table("scan_evidence").insert({
        "scan_id": scan_id,
        "provider": provider,
        "external_id": external_id,
        "status": "pending",
    }).execute()


def get_scan_by_id(scan_id: str) -> dict | None:
    try:
        response = (
            supabase
            .table("scans")
            .select("*")
            .eq("id", scan_id)
            .single()
            .execute()
        )
        print(f"[supabase] scan fetched | scan_id={scan_id} data={response.data}")
        return response.data
    except Exception as e:
        print(f"[supabase] get_scan_by_id failed | scan_id={scan_id}: {str(e)}")
        return None


def get_scan_evidence(scan_id: str) -> dict | None:
    try:
        response = (
            supabase
            .table("scan_evidence")
            .select("*")
            .eq("scan_id", scan_id)
            .execute()
        )
        if response.data:
            return response.data[0]
        return None
    except Exception as e:
        print(f"[supabase] get_scan_evidence failed | scan_id={scan_id}: {str(e)}")
        return None


def update_scan_deep_scan_failed(scan_id: str):
    """
    Update scan row to reflect deep_scan_failed state
    """
    supabase.table("scans").update({
        "deep_scan_failed": True,
    }).eq("id", scan_id).execute()
