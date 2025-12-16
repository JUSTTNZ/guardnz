from datetime import datetime
from enum import Enum
from pydantic import BaseModel


class RiskLevel(str, Enum):
    safe = "safe"
    warning = "warning"
    danger = "danger"

class ScanRequest(BaseModel):
    url: str
class ScanResult(BaseModel):
    id: str
    url: str
    risk_level: RiskLevel
    score: float
    reason: str
    created_at: datetime
