from fastapi import APIRouter
from app.models.user import UserProfile
from app.core.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/onboard")
def onboard_user(profile: UserProfile):
    db = get_db()
    db.users.update_one(
        {"user_id": profile.user_id},
        {"$set": profile.dict()},
        upsert=True
    )
    return {"message": "User profile saved successfully"}
