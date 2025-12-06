from fastapi import FastAPI
from core.config import settings
from app.api.v1.routes.health import router as health_router

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
    )

    # Register Routes
    app.include_router(health_router, prefix="/api/v1", tags=["Health"])

    return app

app = create_app()
