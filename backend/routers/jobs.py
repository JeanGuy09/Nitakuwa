from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime
from models import Job, JobCreate, JobUpdate, JobResponse, JobSearchFilters, Language
from auth import get_current_admin_user, get_current_active_user
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.get("/", response_model=List[JobResponse])
async def get_all_jobs(
    skip: int = 0,
    limit: int = 100,
    sector: Optional[str] = None,
    search: Optional[str] = None,
    language: Language = Language.FRENCH,
    db = Depends(get_database)
):
    """Get all active jobs with filtering"""
    try:
        # Build query
        query = {"isActive": True}
        if sector:
            query["sector"] = sector
        
        # Text search
        if search:
            query["$or"] = [
                {f"title.{language}": {"$regex": search, "$options": "i"}},
                {f"description.{language}": {"$regex": search, "$options": "i"}},
                {"skills": {"$regex": search, "$options": "i"}}
            ]
        
        jobs = []
        async for job_doc in db.jobs.find(query).skip(skip).limit(limit):
            # Get associated data
            job_response = await build_job_response(job_doc, db)
            jobs.append(job_response)
        
        return jobs
        
    except Exception as e:
        logger.error(f"Get jobs error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get jobs"
        )

@router.get("/{job_id}", response_model=JobResponse)
async def get_job_by_id(job_id: str, db = Depends(get_database)):
    """Get job by ID"""
    try:
        job_doc = await db.jobs.find_one({"id": job_id, "isActive": True})
        if not job_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        
        job_response = await build_job_response(job_doc, db)
        return job_response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get job error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get job"
        )

@router.get("/sector/{sector_name}")
async def get_jobs_by_sector(
    sector_name: str,
    skip: int = 0,
    limit: int = 50,
    db = Depends(get_database)
):
    """Get jobs by sector"""
    try:
        jobs = []
        async for job_doc in db.jobs.find({
            "sector": sector_name,
            "isActive": True
        }).skip(skip).limit(limit):
            job_response = await build_job_response(job_doc, db)
            jobs.append(job_response)
        
        return {"jobs": jobs, "sector": sector_name, "total": len(jobs)}
        
    except Exception as e:
        logger.error(f"Get jobs by sector error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get jobs by sector"
        )

# Admin endpoints
@router.post("/", response_model=JobResponse)
async def create_job(
    job_data: JobCreate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Create new job (admin only)"""
    try:
        job = Job(**job_data.dict())
        await db.jobs.insert_one(job.dict())
        
        # Update statistics
        from database import update_platform_statistics
        await update_platform_statistics()
        
        job_response = await build_job_response(job.dict(), db)
        logger.info(f"Job created: {job.id}")
        
        return job_response
        
    except Exception as e:
        logger.error(f"Create job error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create job"
        )

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: str,
    job_update: JobUpdate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Update job (admin only)"""
    try:
        update_data = {k: v for k, v in job_update.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.utcnow()
        
        result = await db.jobs.update_one(
            {"id": job_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        
        # Get updated job
        job_doc = await db.jobs.find_one({"id": job_id})
        job_response = await build_job_response(job_doc, db)
        
        logger.info(f"Job updated: {job_id}")
        return job_response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update job error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update job"
        )

@router.delete("/{job_id}")
async def delete_job(
    job_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Delete job (admin only)"""
    try:
        result = await db.jobs.update_one(
            {"id": job_id},
            {"$set": {"isActive": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        
        logger.info(f"Job deleted: {job_id}")
        return {"status": "success", "message": "Job deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete job error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete job"
        )

async def build_job_response(job_doc: dict, db) -> JobResponse:
    """Build complete job response with associated data"""
    # Get companies
    companies = []
    if job_doc.get("companies"):
        async for company in db.companies.find({"id": {"$in": job_doc["companies"]}}):
            companies.append(company)
    
    # Get training
    training = []
    if job_doc.get("training"):
        async for t in db.training.find({"id": {"$in": job_doc["training"]}}):
            training.append(t)
    
    # Get testimonials
    testimonials = []
    if job_doc.get("testimonials"):
        async for testimonial in db.testimonials.find({
            "id": {"$in": job_doc["testimonials"]},
            "isApproved": True
        }):
            testimonials.append(testimonial)
    
    job_doc["companies"] = companies
    job_doc["training"] = training
    job_doc["testimonials"] = testimonials
    
    return JobResponse(**job_doc)