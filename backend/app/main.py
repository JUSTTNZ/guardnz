from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from app.api import api_router

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
    )

    # Enable CORS (allow frontend access)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Later update to frontend domain
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register all API routes
    app.include_router(api_router, prefix="/api/v1")

    return app

app = create_app()

