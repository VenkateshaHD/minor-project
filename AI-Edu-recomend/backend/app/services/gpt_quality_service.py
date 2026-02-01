import openai
import os
from app.core.config import settings

# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = settings.OPENAI_API_KEY

def gpt_quality_score(resource):
    prompt = f"""
    You are an expert educational content evaluator.
    Rate the following resource on a scale of 0-10 for:
    1. Accuracy
    2. Educational Clarity
    3. Depth of Explanation
    4. Practical Value

    Resource:
    Title: {resource.get('title')}
    Description: {resource.get('description')}

    Return a single number (average of all aspects).
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        score_text = response["choices"][0]["message"]["content"].strip()
        return float(score_text)
    except Exception as e:
        print("GPT scoring error:", e)
        return 0.0
