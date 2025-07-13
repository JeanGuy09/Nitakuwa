from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from models import Company, CompanyCreate
from auth import get_current_admin_user
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/companies", tags=["companies"])

@router.get("/", response_model=List[Company])
async def get_all_companies(
    skip: int = 0,
    limit: int = 100,
    sector: Optional[str] = None,
    db = Depends(get_database)
):
    """Get all active companies"""
    try:
        query = {"isActive": True}
        if sector:
            query["sector"] = sector
        
        companies = []
        async for company_doc in db.companies.find(query).skip(skip).limit(limit):
            companies.append(Company(**company_doc))
        
        return companies
        
    except Exception as e:
        logger.error(f"Get companies error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get companies"
        )

@router.get("/{company_id}", response_model=Company)
async def get_company_by_id(company_id: str, db = Depends(get_database)):
    """Get company by ID"""
    try:
        company_doc = await db.companies.find_one({"id": company_id, "isActive": True})
        if not company_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found"
            )
        
        return Company(**company_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get company error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get company"
        )

# Admin endpoints
@router.post("/", response_model=Company)
async def create_company(
    company_data: CompanyCreate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Create new company (admin only)"""
    try:
        company = Company(**company_data.dict())
        await db.companies.insert_one(company.dict())
        
        # Update statistics
        from database import update_platform_statistics
        await update_platform_statistics()
        
        logger.info(f"Company created: {company.id}")
        return company
        
    except Exception as e:
        logger.error(f"Create company error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create company"
        )

@router.put("/{company_id}", response_model=Company)
async def update_company(
    company_id: str,
    company_update: CompanyCreate,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Update company (admin only)"""
    try:
        update_data = company_update.dict()
        
        result = await db.companies.update_one(
            {"id": company_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found"
            )
        
        # Get updated company
        company_doc = await db.companies.find_one({"id": company_id})
        
        logger.info(f"Company updated: {company_id}")
        return Company(**company_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update company error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update company"
        )

@router.delete("/{company_id}")
async def delete_company(
    company_id: str,
    admin_user = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Delete company (admin only)"""
    try:
        result = await db.companies.update_one(
            {"id": company_id},
            {"$set": {"isActive": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found"
            )
        
        logger.info(f"Company deleted: {company_id}")
        return {"status": "success", "message": "Company deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete company error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete company"
        )