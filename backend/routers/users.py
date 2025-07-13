from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..models import User, UserResponse, UserUpdate, UserProgress
from ..auth import get_current_active_user, get_current_admin_user
from ..database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_active_user)):
    """Get current user profile"""
    return UserResponse(**current_user.dict())

@router.put("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Update current user profile"""
    try:
        update_data = {k: v for k, v in user_update.dict().items() if v is not None}
        
        if update_data:
            await db.users.update_one(
                {"id": current_user.id},
                {"$set": update_data}
            )
        
        # Get updated user
        updated_user = await db.users.find_one({"id": current_user.id})
        logger.info(f"User profile updated: {current_user.email}")
        
        return UserResponse(**updated_user)
        
    except Exception as e:
        logger.error(f"Profile update error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Profile update failed"
        )

@router.post("/favorites/{job_id}")
async def toggle_favorite_job(
    job_id: str,
    current_user: User = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Toggle job in user favorites"""
    try:
        user_doc = await db.users.find_one({"id": current_user.id})
        favorites = user_doc.get("favoriteJobs", [])
        
        if job_id in favorites:
            favorites.remove(job_id)
            action = "removed"
        else:
            favorites.append(job_id)
            action = "added"
        
        await db.users.update_one(
            {"id": current_user.id},
            {"$set": {"favoriteJobs": favorites}}
        )
        
        return {"status": "success", "action": action, "job_id": job_id}
        
    except Exception as e:
        logger.error(f"Toggle favorite error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update favorites"
        )

@router.get("/favorites")
async def get_user_favorites(
    current_user: User = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get user's favorite jobs"""
    try:
        user_doc = await db.users.find_one({"id": current_user.id})
        favorite_job_ids = user_doc.get("favoriteJobs", [])
        
        if not favorite_job_ids:
            return {"favorites": []}
        
        # Get favorite jobs details
        favorite_jobs = []
        async for job in db.jobs.find({"id": {"$in": favorite_job_ids}, "isActive": True}):
            # Get associated data
            companies = []
            if job.get("companies"):
                async for company in db.companies.find({"id": {"$in": job["companies"]}}):
                    companies.append(company)
            
            training = []
            if job.get("training"):
                async for t in db.training.find({"id": {"$in": job["training"]}}):
                    training.append(t)
            
            testimonials = []
            if job.get("testimonials"):
                async for testimonial in db.testimonials.find({"id": {"$in": job["testimonials"]}}):
                    testimonials.append(testimonial)
            
            job["companies"] = companies
            job["training"] = training
            job["testimonials"] = testimonials
            favorite_jobs.append(job)
        
        return {"favorites": favorite_jobs}
        
    except Exception as e:
        logger.error(f"Get favorites error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get favorites"
        )

@router.put("/progress")
async def update_user_progress(
    progress: UserProgress,
    current_user: User = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Update user progress"""
    try:
        await db.users.update_one(
            {"id": current_user.id},
            {"$set": {"progress": progress.dict()}}
        )
        
        return {"status": "success", "progress": progress}
        
    except Exception as e:
        logger.error(f"Update progress error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update progress"
        )

# Admin endpoints
@router.get("/", response_model=List[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    admin_user: User = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Get all users (admin only)"""
    try:
        users = []
        async for user in db.users.find({}).skip(skip).limit(limit):
            users.append(UserResponse(**user))
        
        return users
        
    except Exception as e:
        logger.error(f"Get users error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get users"
        )

@router.get("/stats")
async def get_user_statistics(
    admin_user: User = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Get user statistics (admin only)"""
    try:
        total_users = await db.users.count_documents({})
        total_students = await db.users.count_documents({"role": "student"})
        total_admins = await db.users.count_documents({"role": "site_manager"})
        
        # Users registered this month
        from datetime import datetime
        current_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        new_users_this_month = await db.users.count_documents({
            "createdAt": {"$gte": current_month}
        })
        
        # Active users (logged in this month)
        active_users = await db.users.count_documents({
            "lastActive": {"$gte": current_month}
        })
        
        return {
            "totalUsers": total_users,
            "totalStudents": total_students,
            "totalAdmins": total_admins,
            "newUsersThisMonth": new_users_this_month,
            "activeUsers": active_users
        }
        
    except Exception as e:
        logger.error(f"Get user stats error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get user statistics"
        )