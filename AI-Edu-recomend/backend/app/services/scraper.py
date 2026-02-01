from typing import Optional
import requests
from bs4 import BeautifulSoup

def extract_meta_description(url: str) -> Optional[str]:
    try:
        r = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code != 200:
            return None
        soup = BeautifulSoup(r.text, "lxml")
        tag = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
        if tag and tag.get("content"):
            return tag["content"].strip()
    except Exception:
        return None
    return None
