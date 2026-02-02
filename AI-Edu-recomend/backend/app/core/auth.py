from fastapi import Header, HTTPException
from bson import ObjectId
from app.db.mongo import get_db

def get_current_user_id(authorization: str = Header(None)) -> str:
    """
    Extract user ID from Bearer token.
    Token is the MongoDB _id stored in localStorage.
    """
    if not authorization:
        raise HTTPException(401, "Not authenticated")
    
    try:
        # Extract token from "Bearer <token>"
        token = authorization.replace("Bearer ", "")
        
        # Validate that it's a valid ObjectId
        if not ObjectId.is_valid(token):
            raise HTTPException(401, "Invalid token")
            
        # Verify user exists
        db = get_db()
        user = db.users.find_one({"_id": ObjectId(token)})
        if not user:
            raise HTTPException(401, "User not found")
            
        return token
    except Exception as e:
        raise HTTPException(401, f"Authentication failed: {str(e)}")
