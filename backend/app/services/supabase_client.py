from supabase import create_client, Client
from core.config import settings
from app.schemas.scan import ScanResult

# Initialize Supabase client
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

def save_scan_result(scan_result: ScanResult) -> dict:
    """
    Save scan result to Supabase
    
    Args:
        scan_result: The ScanResult object to save
        
    Returns:
        dict: Response from Supabase
    """
    try:
        data = {
            "id": scan_result.id,
            "url": str(scan_result.url),  # Convert HttpUrl to string for JSON serialization
            "risk_level": scan_result.risk_level,
            "score": scan_result.score,
            "reason": scan_result.reason,
            "created_at": scan_result.created_at.isoformat(),
        }
        
        response = supabase.table("scans").insert(data).execute()
        print(f"✅ Saved scan to Supabase: {scan_result.id}")
        return response.data
        
    except Exception as e:
        print(f"❌ Error saving to Supabase: {str(e)}")
        raise