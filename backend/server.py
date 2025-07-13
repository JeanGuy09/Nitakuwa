from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from contextlib import asynccontextmanager

# Import database
from database import connect_to_mongo, close_mongo_connection, init_sample_data

# Import routers
from routers import auth, users, jobs, sectors, companies, training, testimonials, admin

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    await init_sample_data()
    logger.info("Application started")
    yield
    # Shutdown
    await close_mongo_connection()
    logger.info("Application shutdown")

# Create the main app
app = FastAPI(
    title="KONGENGA API",
    description="API pour la plateforme de carrières KONGENGA en RDC",
    version="1.0.0",
    lifespan=lifespan
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Basic route
@api_router.get("/")
async def root():
    return {"message": "KONGENGA API - Plateforme de carrières pour la RDC"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "KONGENGA API"}

# Include all routers
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(jobs.router)
api_router.include_router(sectors.router)
api_router.include_router(companies.router)
api_router.include_router(training.router)
api_router.include_router(testimonials.router)
api_router.include_router(admin.router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
