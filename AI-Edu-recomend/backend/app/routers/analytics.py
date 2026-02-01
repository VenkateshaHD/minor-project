from fastapi import APIRouter
from app.db.mongo import get_db

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/{user_id}")
def user_analytics(user_id: str):
    db = get_db()
    history = list(db.search_history.find({"user_id": user_id}))
    return {
        "total_searches": len(history),
        "topics": [h["topic"] for h in history]
    }
