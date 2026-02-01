from .embedding_service import compute_semantic_scores
from .gemini_quality_service import gemini_quality_score

def rank_resources(topic, resources, experience_level):
    # 1. Semantic similarity
    sem_scored = compute_semantic_scores(topic, resources)

    # 2. Gemini scoring (TOP 5)
    sem_scored = sorted(sem_scored, key=lambda x: x["semantic_score"], reverse=True)[:5]

    for r in sem_scored:
        r["quality_score"] = gemini_quality_score(r)

    # 3. Personalized weighting
    for r in sem_scored:
        r["final_score"] = (
            0.5 * r["semantic_score"]
            + 0.4 * (r["quality_score"] / 10)
            + 0.1 * (1 if experience_level == "advanced" else 0)    
        )

    return sorted(sem_scored, key=lambda x: x["final_score"], reverse=True)

