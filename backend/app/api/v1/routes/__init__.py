from fastapi import APIRouter
from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.scan import router as scan_router
from app.api.v1.routes.scan_evidence import router as scan_evidence_router


api_router = APIRouter()

api_router.include_router(health_router, prefix="/health")
api_router.include_router(scan_router, prefix="")
api_router.include_router(scan_evidence_router, prefix="")
