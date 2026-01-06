def save_urlscan_uuid(scan_id: str, uuid: str):
    supabase.table("scans").update({
        "urlscan_uuid": uuid,
        "urlscan_status": "pending"
    }).eq("id", scan_id).execute()


def get_scan_by_id(scan_id: str) -> dict | None:
    response = (
        supabase
        .table("scans")
        .select("*")
        .eq("id", scan_id)
        .single()
        .execute()
    )
    return response.data
