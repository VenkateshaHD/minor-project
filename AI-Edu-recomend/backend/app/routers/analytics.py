from fastapi import APIRouter, Depends
from bson import ObjectId
from app.db.mongo import get_db
from app.core.auth import get_current_user_id

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary")
def get_analytics_summary(user_id: str = Depends(get_current_user_id)):
    """
    Get global analytics summary showing most searched topics.
    Aggregates data from all users.
    Requires authentication.
    """
    db = get_db()
    
    # Aggregate top topics across all users
    pipeline = [
        {
            "$group": {
                "_id": "$topic",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$limit": 10
        }
    ]
    
    top_topics = list(db.search_history.aggregate(pipeline))
    
    return {
        "top_topics": top_topics
    }

@router.get("/user")
def get_user_analytics(user_id: str = Depends(get_current_user_id)):
    """
    Get analytics for current user.
    Shows total searches and topics searched.
    Requires authentication via Bearer token.
    """
    db = get_db()
    history = list(db.search_history.find({"user_id": user_id}))
    
    return {
        "total_searches": len(history),
        "topics": [h["topic"] for h in history]
    }

