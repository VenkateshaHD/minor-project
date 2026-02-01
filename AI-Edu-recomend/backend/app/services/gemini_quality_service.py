# import google.generativeai as genai
# import os

# # Configure Gemini API key
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# # Initialize model (you can also try gemini-1.5-flash for faster inference)
# model = genai.GenerativeModel("gemini-2.5-flash")

# def gemini_quality_score(resource):
#     """
#     Uses Gemini to evaluate the quality of a learning resource.
#     Returns a numerical score (0–10).
#     """

#     prompt = f"""
#     You are an educational content quality evaluator.
#     Analyze the following resource for:
#     1. Accuracy
#     2. Clarity of explanation
#     3. Depth of learning
#     4. Practical usefulness

#     Title: {resource.get('title')}
#     Description: {resource.get('description')}

#     Return a single number between 0 and 10 that represents the average quality.
#     """

#     try:
#         response = model.generate_content(prompt)
#         score_text = response.text.strip()

#         # Extract a numeric score safely
#         try:
#             score = float(score_text)
#             if 0 <= score <= 10:
#                 return score
#         except ValueError:
#             pass

#         # fallback: check if a number is embedded in text
#         for token in score_text.split():
#             try:
#                 value = float(token)
#                 if 0 <= value <= 10:
#                     return value
#             except ValueError:
#                 continue

#         return 0.0
#     except Exception as e:
#         print("Gemini quality scoring error:", e)
#         return 0.0


import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

def gemini_quality_score(item: dict) -> float:
    prompt = f"""
    Rate the educational quality (0–10) of this resource.
    Title: {item.get('title')}
    Description: {item.get('description')}
    """

    try:
        r = model.generate_content(prompt)
        return float(r.text.strip())
    except:
        return 0.0
