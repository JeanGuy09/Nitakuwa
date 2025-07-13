from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import IndexModel, ASCENDING, DESCENDING
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    database = None

database = Database()

async def get_database():
    return database.database

async def connect_to_mongo():
    """Create database connection"""
    try:
        database.client = AsyncIOMotorClient(os.environ['MONGO_URL'])
        database.database = database.client[os.environ.get('DB_NAME', 'kongenga')]
        
        # Test connection
        await database.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
        
        # Create indexes
        await create_indexes()
        
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()
        logger.info("Disconnected from MongoDB")

async def create_indexes():
    """Create database indexes for better performance"""
    try:
        db = database.database
        
        # Users collection indexes
        await db.users.create_indexes([
            IndexModel([("email", ASCENDING)], unique=True),
            IndexModel([("role", ASCENDING)]),
            IndexModel([("createdAt", DESCENDING)]),
            IndexModel([("lastActive", DESCENDING)])
        ])
        
        # Jobs collection indexes
        await db.jobs.create_indexes([
            IndexModel([("sector", ASCENDING)]),
            IndexModel([("isActive", ASCENDING)]),
            IndexModel([("skills", ASCENDING)]),
            IndexModel([("createdAt", DESCENDING)]),
            IndexModel([("title.fr", "text"), ("description.fr", "text")]),
            IndexModel([("companies", ASCENDING)]),
            IndexModel([("salaryRange", ASCENDING)])
        ])
        
        # Companies collection indexes
        await db.companies.create_indexes([
            IndexModel([("name", ASCENDING)]),
            IndexModel([("sector", ASCENDING)]),
            IndexModel([("location", ASCENDING)]),
            IndexModel([("isActive", ASCENDING)])
        ])
        
        # Training collection indexes
        await db.training.create_indexes([
            IndexModel([("provider", ASCENDING)]),
            IndexModel([("level", ASCENDING)]),
            IndexModel([("cost", ASCENDING)]),
            IndexModel([("skills", ASCENDING)]),
            IndexModel([("isActive", ASCENDING)])
        ])
        
        # Testimonials collection indexes
        await db.testimonials.create_indexes([
            IndexModel([("jobId", ASCENDING)]),
            IndexModel([("isApproved", ASCENDING)]),
            IndexModel([("isVerified", ASCENDING)]),
            IndexModel([("createdAt", DESCENDING)])
        ])
        
        # Sectors collection indexes
        await db.sectors.create_indexes([
            IndexModel([("isActive", ASCENDING)]),
            IndexModel([("name.fr", ASCENDING)])
        ])
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")

# Database utility functions
async def init_sample_data():
    """Initialize database with sample data if empty"""
    try:
        db = database.database
        
        # Check if data already exists
        sectors_count = await db.sectors.count_documents({})
        if sectors_count > 0:
            logger.info("Sample data already exists")
            return
        
        # Import sample data from mock data structure
        from sample_data import get_sample_sectors, get_sample_companies, get_sample_training, get_sample_jobs, get_sample_testimonials
        
        # Insert sample sectors
        sectors = get_sample_sectors()
        if sectors:
            await db.sectors.insert_many([sector.dict() for sector in sectors])
            logger.info(f"Inserted {len(sectors)} sample sectors")
        
        # Insert sample companies
        companies = get_sample_companies()
        if companies:
            await db.companies.insert_many([company.dict() for company in companies])
            logger.info(f"Inserted {len(companies)} sample companies")
        
        # Insert sample training
        training = get_sample_training()
        if training:
            await db.training.insert_many([t.dict() for t in training])
            logger.info(f"Inserted {len(training)} sample training programs")
        
        # Insert sample testimonials
        testimonials = get_sample_testimonials()
        if testimonials:
            await db.testimonials.insert_many([t.dict() for t in testimonials])
            logger.info(f"Inserted {len(testimonials)} sample testimonials")
        
        # Insert sample jobs
        jobs = get_sample_jobs()
        if jobs:
            await db.jobs.insert_many([job.dict() for job in jobs])
            logger.info(f"Inserted {len(jobs)} sample jobs")
        
        # Update statistics
        await update_platform_statistics()
        
        logger.info("Sample data initialization completed")
        
    except Exception as e:
        logger.error(f"Error initializing sample data: {e}")

async def update_platform_statistics():
    """Update platform statistics"""
    try:
        db = database.database
        
        stats = {
            "totalJobs": await db.jobs.count_documents({"isActive": True}),
            "totalStudents": await db.users.count_documents({"role": "student"}),
            "totalCompanies": await db.companies.count_documents({"isActive": True}),
            "successStories": await db.testimonials.count_documents({"isApproved": True}),
            "activeUsers": await db.users.count_documents({
                "lastActive": {"$gte": datetime.utcnow().replace(day=1)}
            }),
            "lastUpdated": datetime.utcnow()
        }
        
        # Update sectors job count
        sectors = await db.sectors.find({"isActive": True}).to_list(None)
        for sector in sectors:
            job_count = await db.jobs.count_documents({
                "sector": sector["name"]["fr"],
                "isActive": True
            })
            await db.sectors.update_one(
                {"_id": sector["_id"]},
                {"$set": {"jobCount": job_count}}
            )
        
        # Store statistics
        await db.statistics.replace_one(
            {"_id": "platform_stats"},
            {"_id": "platform_stats", **stats},
            upsert=True
        )
        
        logger.info("Platform statistics updated")
        
    except Exception as e:
        logger.error(f"Error updating statistics: {e}")