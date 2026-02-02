from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.models.user import UserProfile
from app.db.mongo import get_db
from app.core.auth import get_current_user_id
from typing import List, Optional

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/profile")
def get_profile(user_id: str = Depends(get_current_user_id)):
    """
    Get current user's profile information.
    Requires authentication via Bearer token.
    """
    db = get_db()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(404, "User not found")
    
    # Return user data with proper field names
    return {
        "name": user.get("name", user.get("email", "").split("@")[0]),
        "email": user.get("email", ""),
        "education_level": user.get("education_level", "UG"),
        "preferred_content_type": user.get("preferred_content_type", "video"),
        "preferred_duration": user.get("preferred_duration", "medium"),
        "weak_topics": user.get("weak_topics", [])
    }

@router.put("/profile")
def update_profile(
    profile_data: dict,
    user_id: str = Depends(get_current_user_id)
):
    """
    Update current user's profile.
    Requires authentication via Bearer token.
    """
    db = get_db()
    
    # Update user profile in database
    result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": profile_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(404, "User not found")
    
    return {"message": "Profile updated successfully"}

@router.get("/history")
def get_user_history(user_id: str = Depends(get_current_user_id)):
    """
    Get current user's search history.
    Returns list of past searches with topics and scores.
    """
    db = get_db()
    
    # Fetch search history for this user, sorted by most recent
    history = list(
        db.search_history.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(50)
    )
    
    # Convert ObjectId to string for JSON serialization
    for item in history:
        item["_id"] = str(item["_id"])
    
    return history

@router.post("/onboard")
def onboard_user(profile: UserProfile):
    """
    Legacy endpoint for onboarding.
    Kept for backwards compatibility.
    """
    db = get_db()
    db.users.update_one(
        {"user_id": profile.user_id},
        {"$set": profile.dict()},
        upsert=True
    )
    return {"message": "User profile saved successfully"}

