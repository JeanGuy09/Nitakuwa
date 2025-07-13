from fastapi import APIRouter, Depends, HTTPException, status
from ..models import PlatformStatistics
from ..auth import get_current_admin_user
from ..database import get_database, update_platform_statistics
import logging
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/statistics")
async def get_platform_statistics(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Get platform statistics (admin only)"""
    try:
        # Update statistics first
        await update_platform_statistics()
        
        # Get statistics
        stats_doc = await db.statistics.find_one({"_id": "platform_stats"})
        if not stats_doc:
            # If no stats exist, create them
            await update_platform_statistics()
            stats_doc = await db.statistics.find_one({"_id": "platform_stats"})
        
        # Remove MongoDB _id field
        if "_id" in stats_doc:
            del stats_doc["_id"]
        
        return stats_doc
        
    except Exception as e:
        logger.error(f"Get statistics error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get statistics"
        )

@router.get("/dashboard")
async def get_admin_dashboard(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Get admin dashboard data"""
    try:
        # Get basic counts
        total_jobs = await db.jobs.count_documents({"isActive": True})
        total_users = await db.users.count_documents({"role": "student"})
        total_companies = await db.companies.count_documents({"isActive": True})
        pending_testimonials = await db.testimonials.count_documents({"isApproved": False})
        
        # Get recent activity
        recent_users = []
        async for user in db.users.find({"role": "student"}).sort("createdAt", -1).limit(5):
            recent_users.append({
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "createdAt": user["createdAt"],
                "university": user.get("university", "N/A")
            })
        
        # Get recent jobs
        recent_jobs = []
        async for job in db.jobs.find({"isActive": True}).sort("createdAt", -1).limit(5):
            recent_jobs.append({
                "id": job["id"],
                "title": job["title"]["fr"],
                "sector": job["sector"],
                "createdAt": job["createdAt"]
            })
        
        # Get sector stats
        sector_stats = []
        async for sector in db.sectors.find({"isActive": True}):
            job_count = await db.jobs.count_documents({
                "sector": sector["name"]["fr"],
                "isActive": True
            })
            sector_stats.append({
                "name": sector["name"]["fr"],
                "jobCount": job_count,
                "growth": sector["growth"]
            })
        
        return {
            "totals": {
                "jobs": total_jobs,
                "users": total_users,
                "companies": total_companies,
                "pendingTestimonials": pending_testimonials
            },
            "recentUsers": recent_users,
            "recentJobs": recent_jobs,
            "sectorStats": sector_stats,
            "lastUpdated": datetime.utcnow()
        }
        
    except Exception as e:
        logger.error(f"Get dashboard error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get dashboard data"
        )

@router.post("/import-sample-data")
async def import_sample_data(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Import sample data (admin only)"""
    try:
        from ..database import init_sample_data
        await init_sample_data()
        
        return {"status": "success", "message": "Sample data imported successfully"}
        
    except Exception as e:
        logger.error(f"Import sample data error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to import sample data"
        )

@router.post("/update-statistics")
async def update_statistics(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Update platform statistics (admin only)"""
    try:
        await update_platform_statistics()
        return {"status": "success", "message": "Statistics updated"}
        
    except Exception as e:
        logger.error(f"Update statistics error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update statistics"
        )

@router.get("/export/users")
async def export_users(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Export users data as CSV (admin only)"""
    try:
        users = []
        async for user in db.users.find({"role": "student"}):
            users.append({
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "university": user.get("university", ""),
                "year": user.get("year", ""),
                "field": user.get("field", ""),
                "createdAt": user["createdAt"],
                "favoriteJobsCount": len(user.get("favoriteJobs", [])),
                "profileComplete": user.get("progress", {}).get("profileComplete", 0)
            })
        
        return {"users": users, "count": len(users)}
        
    except Exception as e:
        logger.error(f"Export users error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to export users"
        )

@router.get("/export/jobs")
async def export_jobs(
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Export jobs data (admin only)"""
    try:
        jobs = []
        async for job in db.jobs.find({"isActive": True}):
            jobs.append({
                "id": job["id"],
                "title": job["title"]["fr"],
                "sector": job["sector"],
                "salaryRange": job["salaryRange"],
                "hiringRate": job["hiringRate"],
                "skillsCount": len(job.get("skills", [])),
                "companiesCount": len(job.get("companies", [])),
                "createdAt": job["createdAt"]
            })
        
        return {"jobs": jobs, "count": len(jobs)}
        
    except Exception as e:
        logger.error(f"Export jobs error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to export jobs"
        )