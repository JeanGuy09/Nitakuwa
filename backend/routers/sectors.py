from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..models import Sector, SectorCreate, Language
from ..auth import get_current_admin_user
from ..database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/sectors", tags=["sectors"])

@router.get("/", response_model=List[Sector])
async def get_all_sectors(db = Depends(get_database)):
    """Get all active sectors"""
    try:
        sectors = []
        async for sector_doc in db.sectors.find({"isActive": True}):
            # Update job count
            job_count = await db.jobs.count_documents({
                "sector": sector_doc["name"]["fr"],
                "isActive": True
            })
            sector_doc["jobCount"] = job_count
            sectors.append(Sector(**sector_doc))
        
        return sectors
        
    except Exception as e:
        logger.error(f"Get sectors error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get sectors"
        )

@router.get("/{sector_id}", response_model=Sector)
async def get_sector_by_id(sector_id: str, db = Depends(get_database)):
    """Get sector by ID"""
    try:
        sector_doc = await db.sectors.find_one({"id": sector_id, "isActive": True})
        if not sector_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sector not found"
            )
        
        # Update job count
        job_count = await db.jobs.count_documents({
            "sector": sector_doc["name"]["fr"],
            "isActive": True
        })
        sector_doc["jobCount"] = job_count
        
        return Sector(**sector_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get sector error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get sector"
        )

# Admin endpoints
@router.post("/", response_model=Sector)
async def create_sector(
    sector_data: SectorCreate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Create new sector (admin only)"""
    try:
        sector = Sector(**sector_data.dict())
        await db.sectors.insert_one(sector.dict())
        
        logger.info(f"Sector created: {sector.id}")
        return sector
        
    except Exception as e:
        logger.error(f"Create sector error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create sector"
        )

@router.put("/{sector_id}", response_model=Sector)
async def update_sector(
    sector_id: str,
    sector_update: SectorCreate,  # Using SectorCreate as update model
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Update sector (admin only)"""
    try:
        update_data = sector_update.dict()
        
        result = await db.sectors.update_one(
            {"id": sector_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sector not found"
            )
        
        # Get updated sector
        sector_doc = await db.sectors.find_one({"id": sector_id})
        
        logger.info(f"Sector updated: {sector_id}")
        return Sector(**sector_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update sector error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update sector"
        )

@router.delete("/{sector_id}")
async def delete_sector(
    sector_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Delete sector (admin only)"""
    try:
        result = await db.sectors.update_one(
            {"id": sector_id},
            {"$set": {"isActive": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sector not found"
            )
        
        logger.info(f"Sector deleted: {sector_id}")
        return {"status": "success", "message": "Sector deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete sector error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete sector"
        )