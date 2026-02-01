from pymongo import MongoClient, ASCENDING
from app.core.config import settings

_client = None
_db = None

def get_db():
    global _client, _db
    if _db is None:
        _client = MongoClient(settings.MONGO_URL)
        _db = _client[settings.MONGO_DB]
        # Indexes
        _db.resources.create_index([("source_id", ASCENDING)], unique=True)
        _db.resources.create_index([("type", ASCENDING), ("topic", ASCENDING)])
    return _db
