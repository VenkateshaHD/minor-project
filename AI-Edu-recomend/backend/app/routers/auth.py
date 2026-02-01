import json
from fastapi import APIRouter, HTTPException
from app.db.mongo import get_db
from app.models.user import UserCreate
from app.core.security import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate):
    # return {"message": "Registered successfully","user": user.dict()}
    db = get_db()
    if db.users.find_one({"email": user.email}):
        raise HTTPException(400, "User already exists")

    db.users.insert_one({
        "email": user.email,
        # "password": hash_password(user.password),
        "password": user.password,
        "profile": None
    })
    return {"message": "Registered successfully"}

@router.post("/login")
def login(user: UserCreate):
    
    if user.email is None or user.password is None:
        raise HTTPException(401, "Invalid Credentials")
    db = get_db()
    u = db.users.find_one({"email": user.email})
    if not u:
        raise HTTPException(400, "User Not Exists")
    if not u or not u["password"] == user.password:
        raise HTTPException(400, "Invalid Credentials")

    return {"access_token": str(u["_id"]), "email": u["email"]}
