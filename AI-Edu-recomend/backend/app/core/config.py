import os
from dotenv import load_dotenv

# Load .env if present
load_dotenv()   

class Settings:
    MONGO_URL: str = os.getenv("MONGO_URL", "mongodb://learning_mongodb:27017")
    MONGO_DB: str = os.getenv("MONGO_DB", "learning_ranker")

    YOUTUBE_API_KEY: str | None = os.getenv("YOUTUBE_API_KEY")
    GOOGLE_API_KEY: str | None = os.getenv("GOOGLE_API_KEY")
    GOOGLE_CSE_ID: str | None = os.getenv("GOOGLE_CSE_ID")
    GEMINI_API_KEY: str | None = os.getenv("GEMINI_API_KEY")

    OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")

settings = Settings()

# mongodb+srv://venkyvenkateshahd1999_db_user:9HDuD6aKrrhBKwkC@cluster0.pnotx57.mongodb.net/?appName=Cluster0
