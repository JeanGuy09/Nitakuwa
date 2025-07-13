from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from models import Testimonial, TestimonialCreate
from auth import get_current_admin_user, get_current_active_user
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/testimonials", tags=["testimonials"])

@router.get("/", response_model=List[Testimonial])
async def get_approved_testimonials(
    skip: int = 0,
    limit: int = 50,
    job_id: Optional[str] = None,
    db = Depends(get_database)
):
    """Get all approved testimonials"""
    try:
        query = {"isApproved": True}
        if job_id:
            query["jobId"] = job_id
        
        testimonials = []
        async for testimonial_doc in db.testimonials.find(query).skip(skip).limit(limit):
            testimonials.append(Testimonial(**testimonial_doc))
        
        return testimonials
        
    except Exception as e:
        logger.error(f"Get testimonials error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get testimonials"
        )

@router.get("/job/{job_id}", response_model=List[Testimonial])
async def get_testimonials_by_job(job_id: str, db = Depends(get_database)):
    """Get approved testimonials for a specific job"""
    try:
        testimonials = []
        async for testimonial_doc in db.testimonials.find({
            "jobId": job_id,
            "isApproved": True
        }):
            testimonials.append(Testimonial(**testimonial_doc))
        
        return testimonials
        
    except Exception as e:
        logger.error(f"Get testimonials by job error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get testimonials for job"
        )

@router.post("/", response_model=Testimonial)
async def create_testimonial(
    testimonial_data: TestimonialCreate,
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Create new testimonial (requires approval)"""
    try:
        # Verify job exists
        job = await db.jobs.find_one({"id": testimonial_data.jobId, "isActive": True})
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        
        testimonial = Testimonial(**testimonial_data.dict())
        await db.testimonials.insert_one(testimonial.dict())
        
        logger.info(f"Testimonial created: {testimonial.id} (pending approval)")
        return testimonial
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Create testimonial error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create testimonial"
        )

# Admin endpoints
@router.get("/pending", response_model=List[Testimonial])
async def get_pending_testimonials(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Get testimonials pending approval (admin only)"""
    try:
        testimonials = []
        async for testimonial_doc in db.testimonials.find({"isApproved": False}):
            testimonials.append(Testimonial(**testimonial_doc))
        
        return testimonials
        
    except Exception as e:
        logger.error(f"Get pending testimonials error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get pending testimonials"
        )

@router.put("/{testimonial_id}/approve")
async def approve_testimonial(
    testimonial_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Approve testimonial (admin only)"""
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"isApproved": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        logger.info(f"Testimonial approved: {testimonial_id}")
        return {"status": "success", "message": "Testimonial approved"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Approve testimonial error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to approve testimonial"
        )

@router.put("/{testimonial_id}/verify")
async def verify_testimonial(
    testimonial_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Verify testimonial as authentic (admin only)"""
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"isVerified": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        logger.info(f"Testimonial verified: {testimonial_id}")
        return {"status": "success", "message": "Testimonial verified"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Verify testimonial error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to verify testimonial"
        )

@router.delete("/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Delete testimonial (admin only)"""
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        logger.info(f"Testimonial deleted: {testimonial_id}")
        return {"status": "success", "message": "Testimonial deleted"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete testimonial error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete testimonial"
        )