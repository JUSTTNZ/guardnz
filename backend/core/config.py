from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "GUARDNZ API"
    APP_VERSION: str = "1.0.0"
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    SUPABASE_TABLE: str = "scans"

    class Config:
        env_file = ".env"

settings = Settings()
