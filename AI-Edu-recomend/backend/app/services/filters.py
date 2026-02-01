BAD_DOMAINS = [
    "reddit.com",
    "quora.com",
    "stackoverflow.com",
    "stackexchange.com",
    "medium.com"
]

def is_valid_resource(item: dict) -> bool:
    url = item.get("url", "").lower()
    title = item.get("title", "").lower()

    if any(bad in url for bad in BAD_DOMAINS):
        return False

    if "shorts" in url:
        return False

    if len(title.split()) < 3:
        return False

    return True


def filter_resources(resources, user_profile):
    filtered = []

    for r in resources:
        # Remove reddit, quora
        if "reddit" in r["url"] or "quora" in r["url"]:
            continue

        # Remove short videos
        if r.get("duration", 600) < 300:
            continue

        # Match preferred format
        if r["type"] not in user_profile["preferred_format"]:
            continue

        filtered.append(r)

    return filtered

