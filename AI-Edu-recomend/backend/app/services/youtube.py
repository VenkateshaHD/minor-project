# import requests
# from typing import List, Dict
# from app.core.config import settings

# YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

# def fetch_youtube_resources(topic: str, limit: int = 5) -> List[Dict]:
#     if not settings.YOUTUBE_API_KEY:
#         return []

#     params = {
#         "part": "snippet",
#         "q": topic,
#         "type": "video",
#         "maxResults": limit,
#         "key": settings.YOUTUBE_API_KEY
#     }

#     resp = requests.get(YOUTUBE_SEARCH_URL, params=params, timeout=15)
#     resp.raise_for_status()
#     data = resp.json()

#     results: List[Dict] = []
#     for item in data.get("items", []):
#         video_id = item["id"]["videoId"]
#         snippet = item["snippet"]

#         results.append({
#             "type": "youtube",
#             "source_id": video_id,
#             "title": snippet["title"],
#             "url": f"https://www.youtube.com/watch?v={video_id}",
#             "description": snippet.get("description", ""),
#             "channel_or_site": snippet.get("channelTitle", ""),
#         })

#     return results


import requests
from typing import List, Dict
from app.core.config import settings

def fetch_youtube_resources(topic: str, limit: int = 5) -> List[Dict]:
    if not settings.GOOGLE_API_KEY or not settings.GOOGLE_CSE_ID:
        return []

    params = {
        "key": settings.GOOGLE_API_KEY,
        "cx": settings.GOOGLE_CSE_ID,
        "q": f"{topic} tutorial course lecture",
        "num": limit
    }

    r = requests.get("https://www.googleapis.com/customsearch/v1", params=params, timeout=10)
    r.raise_for_status()

    results = []
    for it in r.json().get("items", []):
        results.append({
            "type": "youtube",
            "title": it.get("title"),
            "url": it.get("link"),
            "description": it.get("snippet"),
            "channel_or_site": it.get("displayLink"),
            "source_id": it.get("link"),
            "topic": topic
        })

    return results


