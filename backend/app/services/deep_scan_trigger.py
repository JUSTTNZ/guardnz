from threading import Thread

from app.services.urlscan_service import submit_deep_scan
from app.services.supabase_client import save_scan_evidence, update_scan_deep_scan_failed


def trigger_deep_scan_async(url: str, scan_id: str) -> None:
    """
    Phase 7–8: Asynchronously trigger deep scan (urlscan)
    """

    def run():
        try:
            print(f"[urlscan] submission started | scan_id={scan_id}")

            # 1. Submit to urlscan.io
            uuid = submit_deep_scan(url)
            print(f"[urlscan] submission successful | scan_id={scan_id} uuid={uuid}")

            # 2. Register evidence row (this also sets deep_scan_started)
            save_scan_evidence(
                scan_id=scan_id,
                provider="urlscan",
                external_id=uuid,
            )

            print(f"[urlscan] evidence row inserted | scan_id={scan_id} uuid={uuid}")

        except Exception as e:
            print(f"[urlscan] submission failed | scan_id={scan_id}: {str(e)}")
            update_scan_deep_scan_failed(scan_id)

    Thread(target=run, daemon=True).start()


