# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# vectorizer = TfidfVectorizer(stop_words="english")

# def compute_semantic_scores(topic, resources):
#     texts = [topic] + [
#         f"{r.get('title', '')} {r.get('description', '')}"
#         for r in resources
#     ]

#     tfidf = vectorizer.fit_transform(texts)
#     scores = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()

#     for i, r in enumerate(resources):
#         r["semantic_score"] = float(scores[i])

#     return resources

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

vectorizer = TfidfVectorizer(stop_words="english")

def compute_semantic_scores(topic, resources):
    #  If no resources, return early
    if not resources:
        return []

    texts = [topic] + [
        f"{r.get('title','')} {r.get('description','')}"
        for r in resources
    ]

    tfidf = vectorizer.fit_transform(texts)

    # Extra safety check
    if tfidf.shape[0] < 2:
        for r in resources:
            r["semantic_score"] = 0.0
        return resources

    scores = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()

    for i, r in enumerate(resources):
        r["semantic_score"] = float(scores[i])

    return resources


