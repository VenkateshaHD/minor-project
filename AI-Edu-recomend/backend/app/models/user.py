from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    education_level: str
    preferred_format: str
    preferred_duration: str

class UserOut(BaseModel):
    id: str
    email: EmailStr
    profile: Optional[UserProfile]
