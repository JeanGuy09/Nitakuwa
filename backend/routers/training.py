from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from models import Training, TrainingCreate
from auth import get_current_admin_user
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/training", tags=["training"])

@router.get("/", response_model=List[Training])
async def get_all_training(
    skip: int = 0,
    limit: int = 100,
    level: Optional[str] = None,
    provider: Optional[str] = None,
    db = Depends(get_database)
):
    """Get all active training programs"""
    try:
        query = {"isActive": True}
        if level:
            query["level"] = level
        if provider:
            query["provider"] = {"$regex": provider, "$options": "i"}
        
        training_list = []
        async for training_doc in db.training.find(query).skip(skip).limit(limit):
            training_list.append(Training(**training_doc))
        
        return training_list
        
    except Exception as e:
        logger.error(f"Get training error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get training programs"
        )

@router.get("/{training_id}", response_model=Training)
async def get_training_by_id(training_id: str, db = Depends(get_database)):
    """Get training by ID"""
    try:
        training_doc = await db.training.find_one({"id": training_id, "isActive": True})
        if not training_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Training not found"
            )
        
        return Training(**training_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get training error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get training"
        )

@router.get("/skills/{skill}")
async def get_training_by_skill(skill: str, db = Depends(get_database)):
    """Get training programs that teach a specific skill"""
    try:
        training_list = []
        async for training_doc in db.training.find({
            "skills": {"$regex": skill, "$options": "i"},
            "isActive": True
        }):
            training_list.append(Training(**training_doc))
        
        return {"skill": skill, "training": training_list}
        
    except Exception as e:
        logger.error(f"Get training by skill error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get training by skill"
        )

# Admin endpoints
@router.post("/", response_model=Training)
async def create_training(
    training_data: TrainingCreate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Create new training program (admin only)"""
    try:
        training = Training(**training_data.dict())
        await db.training.insert_one(training.dict())
        
        logger.info(f"Training created: {training.id}")
        return training
        
    except Exception as e:
        logger.error(f"Create training error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create training"
        )

@router.put("/{training_id}", response_model=Training)
async def update_training(
    training_id: str,
    training_update: TrainingCreate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Update training program (admin only)"""
    try:
        update_data = training_update.dict()
        
        result = await db.training.update_one(
            {"id": training_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Training not found"
            )
        
        # Get updated training
        training_doc = await db.training.find_one({"id": training_id})
        
        logger.info(f"Training updated: {training_id}")
        return Training(**training_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update training error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update training"
        )

@router.delete("/{training_id}")
async def delete_training(
    training_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Delete training program (admin only)"""
    try:
        result = await db.training.update_one(
            {"id": training_id},
            {"$set": {"isActive": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Training not found"
            )
        
        logger.info(f"Training deleted: {training_id}")
        return {"status": "success", "message": "Training deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete training error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete training"
        )