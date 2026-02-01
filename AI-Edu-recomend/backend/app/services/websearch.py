# import requests
# from typing import List, Dict
# from app.core.config import settings

# CSE_URL = "https://www.googleapis.com/customsearch/v1"

# def fetch_web_results(topic: str, limit: int = 5) -> List[Dict]:
#     if not (settings.GOOGLE_API_KEY and settings.GOOGLE_CSE_ID):
#         return []

#     params = {
#         "key": settings.GOOGLE_API_KEY,
#         "cx": settings.GOOGLE_CSE_ID,
#         "q": topic,
#         "num": min(limit, 10)
#     }
#     resp = requests.get(CSE_URL, params=params, timeout=20)
#     resp.raise_for_status()
#     data = resp.json()
#     items = data.get("items", []) or []

#     results: List[Dict] = []
#     for it in items:
#         title = it.get("title", "")
#         link = it.get("link", "")
#         snippet = it.get("snippet", "") or ""
#         display_link = it.get("displayLink", "")
#         results.append({
#             "type": "web",
#             "title": title,
#             "url": link,
#             "description": snippet,
#             "channel_or_site": display_link,
#             "source_id": link,
#             "topic": topic
#         })
#     return results


import requests
from typing import List, Dict
from app.core.config import settings

def fetch_web_results(topic: str, limit: int = 5) -> List[Dict]:
    if not settings.GOOGLE_API_KEY or not settings.GOOGLE_CSE_ID:
        return []

    params = {
        "key": settings.GOOGLE_API_KEY,
        "cx": settings.GOOGLE_CSE_ID,
        "q": f"{topic} course tutorial learning",
        "num": limit
    }

    r = requests.get("https://www.googleapis.com/customsearch/v1", params=params, timeout=10)
    r.raise_for_status()

    results = []
    for it in r.json().get("items", []):
        results.append({
            "type": "web",
            "title": it.get("title"),
            "url": it.get("link"),
            "description": it.get("snippet"),
            "channel_or_site": it.get("displayLink"),
            "source_id": it.get("link"),
            "topic": topic
        })

    return results
