from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum
import uuid

class UserRole(str, Enum):
    STUDENT = "student"
    SITE_MANAGER = "site_manager"

class Language(str, Enum):
    FRENCH = "fr"
    LINGALA = "ln"
    SWAHILI = "sw"
    ENGLISH = "en"
    KIKONGO = "kg"

# Base Models
class MultilingualText(BaseModel):
    fr: str  # French (default)
    ln: Optional[str] = None  # Lingala
    sw: Optional[str] = None  # Swahili
    en: Optional[str] = None  # English
    kg: Optional[str] = None  # Kikongo

class ExternalLink(BaseModel):
    name: str
    url: str
    description: Optional[str] = None

# User Models
class UserProgress(BaseModel):
    profileComplete: int = 30
    jobsExplored: int = 0
    trainingsStarted: int = 0
    skillsAssessed: int = 0

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    password_hash: str
    role: UserRole = UserRole.STUDENT
    university: Optional[str] = None
    year: Optional[str] = None
    field: Optional[str] = None
    favoriteJobs: List[str] = []
    progress: UserProgress = Field(default_factory=UserProgress)
    preferredLanguage: Language = Language.FRENCH
    avatar: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    lastActive: Optional[datetime] = None

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    university: Optional[str] = None
    year: Optional[str] = None
    field: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    userType: str = "student"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    university: Optional[str] = None
    year: Optional[str] = None
    field: Optional[str] = None
    preferredLanguage: Optional[Language] = None

# Company Models
class Company(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: MultilingualText
    logo: Optional[str] = None
    website: Optional[ExternalLink] = None
    location: str
    sector: str
    size: Optional[str] = None  # "1-10", "11-50", "51-200", "200+"
    contactEmail: Optional[str] = None
    contactPhone: Optional[str] = None
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class CompanyCreate(BaseModel):
    name: str
    description: MultilingualText
    logo: Optional[str] = None
    website: Optional[ExternalLink] = None
    location: str
    sector: str
    size: Optional[str] = None
    contactEmail: Optional[str] = None
    contactPhone: Optional[str] = None

# Training Models
class Training(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: MultilingualText
    provider: str
    description: MultilingualText
    duration: str  # "3 months", "6 weeks", etc.
    cost: str  # "Free", "$100", "200€", etc.
    level: str  # "Beginner", "Intermediate", "Advanced"
    language: str  # "French", "English", etc.
    format: str  # "Online", "In-person", "Hybrid"
    externalLink: ExternalLink
    skills: List[str] = []
    prerequisites: List[str] = []
    certificate: bool = False
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class TrainingCreate(BaseModel):
    name: MultilingualText
    provider: str
    description: MultilingualText
    duration: str
    cost: str
    level: str
    language: str
    format: str
    externalLink: ExternalLink
    skills: List[str] = []
    prerequisites: List[str] = []
    certificate: bool = False

# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    company: str
    quote: MultilingualText
    image: Optional[str] = None
    linkedIn: Optional[str] = None
    isVerified: bool = False
    isApproved: bool = False
    jobId: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    position: str
    company: str
    quote: MultilingualText
    image: Optional[str] = None
    linkedIn: Optional[str] = None
    jobId: str

# Job Models
class Job(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: MultilingualText
    sector: str
    description: MultilingualText
    education: List[str] = []
    salaryRange: str
    hiringRate: str
    growthProjection: str
    companies: List[str] = []  # Company IDs
    skills: List[str] = []
    training: List[str] = []  # Training IDs
    testimonials: List[str] = []  # Testimonial IDs
    requirements: MultilingualText
    benefits: MultilingualText
    workEnvironment: MultilingualText
    careerPath: MultilingualText
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class JobCreate(BaseModel):
    title: MultilingualText
    sector: str
    description: MultilingualText
    education: List[str] = []
    salaryRange: str
    hiringRate: str
    growthProjection: str
    companies: List[str] = []
    skills: List[str] = []
    training: List[str] = []
    requirements: MultilingualText
    benefits: MultilingualText
    workEnvironment: MultilingualText
    careerPath: MultilingualText

class JobUpdate(BaseModel):
    title: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    education: Optional[List[str]] = None
    salaryRange: Optional[str] = None
    hiringRate: Optional[str] = None
    growthProjection: Optional[str] = None
    companies: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    training: Optional[List[str]] = None
    requirements: Optional[MultilingualText] = None
    benefits: Optional[MultilingualText] = None
    workEnvironment: Optional[MultilingualText] = None
    careerPath: Optional[MultilingualText] = None
    isActive: Optional[bool] = None

# Sector Models
class Sector(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: MultilingualText
    description: MultilingualText
    icon: str
    color: str  # Tailwind gradient classes
    jobCount: int = 0
    growth: str
    backgroundImage: Optional[str] = None
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class SectorCreate(BaseModel):
    name: MultilingualText
    description: MultilingualText
    icon: str
    color: str
    growth: str
    backgroundImage: Optional[str] = None

# Statistics Models
class PlatformStatistics(BaseModel):
    totalJobs: int = 0
    totalStudents: int = 0
    totalCompanies: int = 0
    successStories: int = 0
    activeUsers: int = 0
    newUsersThisMonth: int = 0
    jobApplications: int = 0
    sectorsGrowth: Dict[str, str] = {}
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class JobResponse(BaseModel):
    id: str
    title: MultilingualText
    sector: str
    description: MultilingualText
    education: List[str]
    salaryRange: str
    hiringRate: str
    growthProjection: str
    companies: List[Company] = []
    skills: List[str]
    training: List[Training] = []
    testimonials: List[Testimonial] = []
    requirements: MultilingualText
    benefits: MultilingualText
    workEnvironment: MultilingualText
    careerPath: MultilingualText
    isActive: bool
    createdAt: datetime

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: UserRole
    university: Optional[str]
    year: Optional[str]
    field: Optional[str]
    favoriteJobs: List[str]
    progress: UserProgress
    preferredLanguage: Language
    avatar: Optional[str]
    createdAt: datetime

# Search and Filter Models
class JobSearchFilters(BaseModel):
    sector: Optional[str] = None
    salaryMin: Optional[int] = None
    salaryMax: Optional[int] = None
    skills: Optional[List[str]] = None
    education: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    language: Optional[Language] = Language.FRENCH

class JobSearchResponse(BaseModel):
    jobs: List[JobResponse]
    total: int
    page: int
    pageSize: int
    totalPages: int
    filters: JobSearchFilters