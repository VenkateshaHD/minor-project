from fastapi import APIRouter
from app.db.mongo import get_db
from app.models.user import UserProfile
from bson import ObjectId

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

@router.post("/{user_id}")
def save_profile(user_id: str, profile: UserProfile):
    
    if not user_id:
        return {"message": "user id is required"}
    db = get_db()
    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"profile": profile.dict()}}
    )
    return {"message": "Profile saved"}
