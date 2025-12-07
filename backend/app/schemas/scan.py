from datetime import datetime
from enum import Enum
from pydantic import BaseModel, HttpUrl

class RiskLevel(str, Enum):
    safe = "safe"
    warning = "warning"
    danger = "danger"

class ScanRequest(BaseModel):
    url: HttpUrl

class ScanResult(BaseModel):
    id: str
    url: HttpUrl
    risk_level: RiskLevel
    score: float
    reason: str
    created_at: datetime