from threading import Thread
from app.services.urlscan_service import submit_deep_scan
from app.services.supabase_client import save_urlscan_uuid


def trigger_deep_scan_async(url: str, scan_id: str) -> None:
    def run():
        try:
            uuid = submit_deep_scan(url)
            save_urlscan_uuid(scan_id, uuid)
            print(f"[urlscan] stored uuid={uuid} for scan_id={scan_id}")
        except Exception as e:
            print("[urlscan] submission failed:", e)

    Thread(target=run, daemon=True).start()
