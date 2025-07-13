from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from ..models import User, UserCreate, UserLogin, UserResponse
from ..auth import authenticate_user, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
from ..database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register", response_model=dict)
async def register_user(user_data: UserCreate, db = Depends(get_database)):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        user = User(
            name=user_data.name,
            email=user_data.email,
            password_hash=hashed_password,
            university=user_data.university,
            year=user_data.year,
            field=user_data.field
        )
        
        # Insert user to database
        await db.users.insert_one(user.dict())
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.id}, expires_delta=access_token_expires
        )
        
        logger.info(f"User registered successfully: {user.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse(**user.dict())
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )

@router.post("/login", response_model=dict)
async def login_user(user_data: UserLogin, db = Depends(get_database)):
    """Login user"""
    try:
        # Handle admin login
        if user_data.userType == "manager":
            if user_data.email == "admin@careerplatform.cd" and user_data.password == "admin123":
                # Create admin user if doesn't exist
                admin_user = await db.users.find_one({"email": user_data.email})
                if not admin_user:
                    admin = User(
                        name="Administrateur KONGENGA",
                        email=user_data.email,
                        password_hash=get_password_hash(user_data.password),
                        role="site_manager"
                    )
                    await db.users.insert_one(admin.dict())
                    admin_user = admin.dict()
                
                access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                access_token = create_access_token(
                    data={"sub": admin_user["id"]}, expires_delta=access_token_expires
                )
                
                return {
                    "access_token": access_token,
                    "token_type": "bearer",
                    "user": UserResponse(**admin_user)
                }
        
        # Regular user authentication
        user = await authenticate_user(user_data.email, user_data.password, db)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Update last active
        await db.users.update_one(
            {"id": user.id},
            {"$set": {"lastActive": user.createdAt}}
        )
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.id}, expires_delta=access_token_expires
        )
        
        logger.info(f"User logged in: {user.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse(**user.dict())
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db = Depends(get_database)
):
    """OAuth2 compatible token endpoint"""
    user = await authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}