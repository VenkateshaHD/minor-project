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
        # if r["type"] not in user_profile['profile']["preferred_format"]:
        #     continue

        filtered.append(r)

    return filtered
