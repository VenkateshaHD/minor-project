from fastapi import APIRouter, Query
from app.core.database import get_db
from app.services.youtube import fetch_youtube_resources
from app.services.websearch import fetch_web_results
from app.services.ranking_engine import rank_resources
from app.utils.filters import filter_resources
from bson import ObjectId
from datetime import datetime


router = APIRouter(prefix="/resources", tags=["Resources"])

@router.get("/ranked")
def ranked_resources(user_id: str= Query(...), topic: str = Query(...), experience_level: str = Query(...)):
    db = get_db()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"error": "User not onboarded"}

    youtube = fetch_youtube_resources(topic, limit=6)
    web = fetch_web_results(topic, limit=6)
    all_resources = youtube 
    # all_resources = youtube + web

    filtered = filter_resources(all_resources, user)
    ranked = rank_resources(topic, filtered, "basic")

    # Store history with timestamp and score
    top_score = ranked[0].get("final_score", 0) if ranked else 0
    db.search_history.insert_one({
        "user_id": user_id,
        "topic": topic,
        "results_count": len(ranked),
        "top_result_score": top_score,
        "timestamp": datetime.utcnow(),
        "search_count": len(ranked)
    })

    return {"topic": topic, "results": ranked}


