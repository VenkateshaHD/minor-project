from typing import Optional, Literal
from pydantic import BaseModel, HttpUrl, Field

ResourceType = Literal["youtube", "web"]

class ResourceIn(BaseModel):
    type: ResourceType
    title: str
    url: HttpUrl
    description: Optional[str] = None
    channel_or_site: Optional[str] = None
    source_id: str = Field(..., description="Unique id from source (videoId for YouTube, link for web)")
    topic: str

class ResourceOut(ResourceIn):
    id: str
