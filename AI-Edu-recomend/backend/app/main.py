from fastapi import FastAPI, Request
from app.routers import health
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.logging_config import setup_logging


from app.routers import resources, health, analytics, onboarding, users, auth, users

import logging
import time

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting backend...")
    # connect_to_mongo()
    yield
    # close_mongo_connection()
    print("Backend stopped.")
    
    # Setup logging FIRST
setup_logging()
logger = logging.getLogger("learning-backend")


app = FastAPI(
    title="AI-Powered Learning Content Recommendation & Ranking System",
    lifespan=lifespan,
)

app.include_router(health.router)
app.include_router(resources.router)
app.include_router(analytics.router)
app.include_router(onboarding.router)
app.include_router(users.router)
app.include_router(auth.router)

origins = [
    "http://localhost",
    "http://localhost:3000",  # if you run Next.js here
    "http://127.0.0.1:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000

    logger.info(
        f"{request.method} {request.url.path} "
        f"→ {response.status_code} "
        f"[{process_time:.2f}ms]"
    )
    return response


@app.get("/")
def root():
    return {"message": "Backend Running Successfully!"}
