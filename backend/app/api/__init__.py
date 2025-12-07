from fastapi import APIRouter
from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.scan import router as scan_router

api_router = APIRouter()

api_router.include_router(health_router, tags=["Health"])
api_router.include_router(scan_router, tags=["Scan"])
