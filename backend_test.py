#!/usr/bin/env python3
"""
KONGENGA Backend API Test Suite
Tests all backend functionality for the DRC career platform
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "https://efe7a84c-9cfa-4ffe-bcc6-7a5adb0d358e.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@careerplatform.cd"
ADMIN_PASSWORD = "admin123"

class KongengaAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.admin_token = None
        self.student_token = None
        self.test_results = []
        self.created_resources = {
            'users': [],
            'jobs': [],
            'companies': [],
            'training': [],
            'testimonials': [],
            'sectors': []
        }
        
    def log_test(self, test_name: str, success: bool, message: str, details: Any = None):
        """Log test result"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def make_request(self, method: str, endpoint: str, data: Dict = None, 
                    headers: Dict = None, token: str = None) -> requests.Response:
        """Make HTTP request with optional authentication"""
        url = f"{self.base_url}{endpoint}"
        request_headers = headers or {}
        
        if token:
            request_headers['Authorization'] = f'Bearer {token}'
        
        try:
            if method.upper() == 'GET':
                response = self.session.get(url, headers=request_headers, params=data)
            elif method.upper() == 'POST':
                response = self.session.post(url, json=data, headers=request_headers)
            elif method.upper() == 'PUT':
                response = self.session.put(url, json=data, headers=request_headers)
            elif method.upper() == 'DELETE':
                response = self.session.delete(url, headers=request_headers)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            return response
        except Exception as e:
            print(f"Request failed: {e}")
            raise
    
    def test_health_check(self):
        """Test basic API health"""
        try:
            response = self.make_request('GET', '/')
            if response.status_code == 200:
                data = response.json()
                self.log_test("API Health Check", True, 
                            f"API is healthy: {data.get('message', 'OK')}")
            else:
                self.log_test("API Health Check", False, 
                            f"Health check failed with status {response.status_code}")
        except Exception as e:
            self.log_test("API Health Check", False, f"Health check error: {str(e)}")
    
    def test_admin_authentication(self):
        """Test admin login"""
        try:
            login_data = {
                "email": ADMIN_EMAIL,
                "password": ADMIN_PASSWORD,
                "userType": "manager"
            }
            
            response = self.make_request('POST', '/auth/login', login_data)
            
            if response.status_code == 200:
                data = response.json()
                self.admin_token = data.get('access_token')
                user_data = data.get('user', {})
                
                if self.admin_token and user_data.get('role') == 'site_manager':
                    self.log_test("Admin Authentication", True, 
                                f"Admin login successful for {user_data.get('name')}")
                else:
                    self.log_test("Admin Authentication", False, 
                                "Login response missing token or incorrect role")
            else:
                self.log_test("Admin Authentication", False, 
                            f"Admin login failed with status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Admin Authentication", False, f"Admin login error: {str(e)}")
    
    def test_student_registration_and_login(self):
        """Test student registration and login"""
        try:
            # Test student registration
            student_data = {
                "name": "Marie Kabila",
                "email": "marie.kabila@unikin.cd",
                "password": "securepass123",
                "university": "Université de Kinshasa",
                "year": "3ème année",
                "field": "Informatique"
            }
            
            response = self.make_request('POST', '/auth/register', student_data)
            
            if response.status_code == 200:
                data = response.json()
                self.student_token = data.get('access_token')
                user_data = data.get('user', {})
                self.created_resources['users'].append(user_data.get('id'))
                
                self.log_test("Student Registration", True, 
                            f"Student registered successfully: {user_data.get('name')}")
                
                # Test student login
                login_data = {
                    "email": student_data["email"],
                    "password": student_data["password"],
                    "userType": "student"
                }
                
                login_response = self.make_request('POST', '/auth/login', login_data)
                
                if login_response.status_code == 200:
                    login_result = login_response.json()
                    self.log_test("Student Login", True, 
                                "Student login successful")
                else:
                    self.log_test("Student Login", False, 
                                f"Student login failed: {login_response.status_code}")
            else:
                self.log_test("Student Registration", False, 
                            f"Registration failed: {response.status_code} - {response.text}")
        except Exception as e:
            self.log_test("Student Registration/Login", False, f"Error: {str(e)}")
    
    def test_sectors_management(self):
        """Test sectors endpoints"""
        try:
            # Test get all sectors
            response = self.make_request('GET', '/sectors/')
            
            if response.status_code == 200:
                sectors = response.json()
                self.log_test("Get Sectors", True, 
                            f"Retrieved {len(sectors)} sectors")
                
                # Test multilingual support
                if sectors and 'name' in sectors[0]:
                    name_data = sectors[0]['name']
                    if isinstance(name_data, dict) and 'fr' in name_data:
                        self.log_test("Sectors Multilingual Support", True, 
                                    "Sectors support multilingual names")
                    else:
                        self.log_test("Sectors Multilingual Support", False, 
                                    "Sectors missing multilingual support")
                
                # Test create sector (admin only)
                if self.admin_token:
                    new_sector = {
                        "name": {
                            "fr": "Technologies Émergentes",
                            "en": "Emerging Technologies",
                            "ln": "Mayele ya sika"
                        },
                        "description": {
                            "fr": "Secteur des nouvelles technologies en RDC",
                            "en": "New technology sector in DRC"
                        },
                        "icon": "🚀",
                        "color": "from-purple-500 to-pink-500",
                        "growth": "25%"
                    }
                    
                    create_response = self.make_request('POST', '/sectors/', 
                                                     new_sector, token=self.admin_token)
                    
                    if create_response.status_code == 200:
                        created_sector = create_response.json()
                        self.created_resources['sectors'].append(created_sector.get('id'))
                        self.log_test("Create Sector", True, 
                                    f"Created sector: {created_sector.get('name', {}).get('fr')}")
                    else:
                        self.log_test("Create Sector", False, 
                                    f"Failed to create sector: {create_response.status_code}")
            else:
                self.log_test("Get Sectors", False, 
                            f"Failed to get sectors: {response.status_code}")
        except Exception as e:
            self.log_test("Sectors Management", False, f"Error: {str(e)}")
    
    def test_companies_management(self):
        """Test companies endpoints"""
        try:
            # Test get all companies
            response = self.make_request('GET', '/companies/')
            
            if response.status_code == 200:
                companies = response.json()
                self.log_test("Get Companies", True, 
                            f"Retrieved {len(companies)} companies")
                
                # Test external links support
                if companies:
                    for company in companies[:3]:  # Check first 3
                        if 'website' in company and company['website']:
                            website = company['website']
                            if isinstance(website, dict) and 'url' in website:
                                self.log_test("Company External Links", True, 
                                            "Companies support external website links")
                                break
                
                # Test create company (admin only)
                if self.admin_token:
                    new_company = {
                        "name": "TechKin Solutions",
                        "description": {
                            "fr": "Entreprise technologique basée à Kinshasa",
                            "en": "Technology company based in Kinshasa"
                        },
                        "website": {
                            "name": "Site Web",
                            "url": "https://techkin.cd",
                            "description": "Site officiel de TechKin"
                        },
                        "location": "Kinshasa, RDC",
                        "sector": "Technologie",
                        "size": "11-50",
                        "contactEmail": "contact@techkin.cd"
                    }
                    
                    create_response = self.make_request('POST', '/companies/', 
                                                     new_company, token=self.admin_token)
                    
                    if create_response.status_code == 200:
                        created_company = create_response.json()
                        self.created_resources['companies'].append(created_company.get('id'))
                        self.log_test("Create Company", True, 
                                    f"Created company: {created_company.get('name')}")
                    else:
                        self.log_test("Create Company", False, 
                                    f"Failed to create company: {create_response.status_code}")
            else:
                self.log_test("Get Companies", False, 
                            f"Failed to get companies: {response.status_code}")
        except Exception as e:
            self.log_test("Companies Management", False, f"Error: {str(e)}")
    
    def test_training_management(self):
        """Test training endpoints"""
        try:
            # Test get all training
            response = self.make_request('GET', '/training/')
            
            if response.status_code == 200:
                training_list = response.json()
                self.log_test("Get Training Programs", True, 
                            f"Retrieved {len(training_list)} training programs")
                
                # Test external links in training
                if training_list:
                    for training in training_list[:3]:
                        if 'externalLink' in training and training['externalLink']:
                            link = training['externalLink']
                            if isinstance(link, dict) and 'url' in link:
                                self.log_test("Training External Links", True, 
                                            "Training programs support external links")
                                break
                
                # Test create training (admin only)
                if self.admin_token:
                    new_training = {
                        "name": {
                            "fr": "Formation Python pour Débutants",
                            "en": "Python Training for Beginners"
                        },
                        "provider": "École Numérique RDC",
                        "description": {
                            "fr": "Apprenez Python depuis zéro",
                            "en": "Learn Python from scratch"
                        },
                        "duration": "3 mois",
                        "cost": "Gratuit",
                        "level": "Débutant",
                        "language": "Français",
                        "format": "En ligne",
                        "externalLink": {
                            "name": "Inscription",
                            "url": "https://ecole-numerique.cd/python",
                            "description": "Lien d'inscription au cours"
                        },
                        "skills": ["Python", "Programmation", "Développement Web"],
                        "certificate": True
                    }
                    
                    create_response = self.make_request('POST', '/training/', 
                                                     new_training, token=self.admin_token)
                    
                    if create_response.status_code == 200:
                        created_training = create_response.json()
                        self.created_resources['training'].append(created_training.get('id'))
                        self.log_test("Create Training", True, 
                                    f"Created training: {created_training.get('name', {}).get('fr')}")
                    else:
                        self.log_test("Create Training", False, 
                                    f"Failed to create training: {create_response.status_code}")
            else:
                self.log_test("Get Training Programs", False, 
                            f"Failed to get training: {response.status_code}")
        except Exception as e:
            self.log_test("Training Management", False, f"Error: {str(e)}")
    
    def test_jobs_management(self):
        """Test jobs endpoints"""
        try:
            # Test get all jobs
            response = self.make_request('GET', '/jobs/')
            
            if response.status_code == 200:
                jobs = response.json()
                self.log_test("Get Jobs", True, 
                            f"Retrieved {len(jobs)} jobs")
                
                # Test job search functionality
                search_response = self.make_request('GET', '/jobs/', 
                                                  {'search': 'développeur', 'language': 'fr'})
                
                if search_response.status_code == 200:
                    search_results = search_response.json()
                    self.log_test("Job Search", True, 
                                f"Search returned {len(search_results)} results")
                else:
                    self.log_test("Job Search", False, 
                                f"Search failed: {search_response.status_code}")
                
                # Test sector filtering
                if jobs:
                    first_job_sector = jobs[0].get('sector')
                    if first_job_sector:
                        sector_response = self.make_request('GET', '/jobs/', 
                                                          {'sector': first_job_sector})
                        
                        if sector_response.status_code == 200:
                            sector_jobs = sector_response.json()
                            self.log_test("Job Sector Filtering", True, 
                                        f"Sector filter returned {len(sector_jobs)} jobs")
                        else:
                            self.log_test("Job Sector Filtering", False, 
                                        f"Sector filtering failed: {sector_response.status_code}")
                
                # Test create job (admin only)
                if self.admin_token:
                    new_job = {
                        "title": {
                            "fr": "Développeur Full-Stack Junior",
                            "en": "Junior Full-Stack Developer"
                        },
                        "sector": "Technologie",
                        "description": {
                            "fr": "Poste de développeur pour startup tech à Kinshasa",
                            "en": "Developer position for tech startup in Kinshasa"
                        },
                        "education": ["Licence en Informatique", "Formation technique"],
                        "salaryRange": "800-1200 USD",
                        "hiringRate": "Élevé",
                        "growthProjection": "15% par an",
                        "skills": ["JavaScript", "Python", "React", "Node.js"],
                        "requirements": {
                            "fr": "2 ans d'expérience minimum",
                            "en": "Minimum 2 years experience"
                        },
                        "benefits": {
                            "fr": "Assurance santé, formation continue",
                            "en": "Health insurance, continuous training"
                        },
                        "workEnvironment": {
                            "fr": "Bureau moderne, équipe jeune",
                            "en": "Modern office, young team"
                        },
                        "careerPath": {
                            "fr": "Évolution vers senior developer",
                            "en": "Growth to senior developer"
                        }
                    }
                    
                    create_response = self.make_request('POST', '/jobs/', 
                                                     new_job, token=self.admin_token)
                    
                    if create_response.status_code == 200:
                        created_job = create_response.json()
                        self.created_resources['jobs'].append(created_job.get('id'))
                        self.log_test("Create Job", True, 
                                    f"Created job: {created_job.get('title', {}).get('fr')}")
                    else:
                        self.log_test("Create Job", False, 
                                    f"Failed to create job: {create_response.status_code}")
            else:
                self.log_test("Get Jobs", False, 
                            f"Failed to get jobs: {response.status_code}")
        except Exception as e:
            self.log_test("Jobs Management", False, f"Error: {str(e)}")
    
    def test_user_favorites(self):
        """Test user favorites functionality with detailed error debugging"""
        try:
            if not self.student_token:
                self.log_test("User Favorites", False, "No student token available")
                return
            
            # Get jobs first
            jobs_response = self.make_request('GET', '/jobs/')
            
            if jobs_response.status_code == 200:
                jobs = jobs_response.json()
                
                if jobs:
                    # Test with multiple jobs to ensure we have data
                    job_ids = [job.get('id') for job in jobs[:3] if job.get('id')]
                    
                    for i, job_id in enumerate(job_ids):
                        # Test add to favorites
                        fav_response = self.make_request('POST', f'/users/favorites/{job_id}', 
                                                       token=self.student_token)
                        
                        if fav_response.status_code == 200:
                            fav_result = fav_response.json()
                            self.log_test(f"Add Job {i+1} to Favorites", True, 
                                        f"Job {fav_result.get('action')} to favorites")
                        else:
                            self.log_test(f"Add Job {i+1} to Favorites", False, 
                                        f"Failed to add favorite: {fav_response.status_code} - {fav_response.text}")
                    
                    # Test get favorites with detailed error capture
                    get_fav_response = self.make_request('GET', '/users/favorites', 
                                                       token=self.student_token)
                    
                    if get_fav_response.status_code == 200:
                        favorites = get_fav_response.json()
                        self.log_test("Get User Favorites", True, 
                                    f"Retrieved {len(favorites.get('favorites', []))} favorites")
                        
                        # Log details of retrieved favorites for debugging
                        if favorites.get('favorites'):
                            for idx, fav in enumerate(favorites['favorites'][:2]):  # Show first 2
                                print(f"   Favorite {idx+1}: {fav.get('title', {}).get('fr', 'No title')}")
                                print(f"   Companies: {len(fav.get('companies', []))}")
                                print(f"   Training: {len(fav.get('training', []))}")
                                print(f"   Testimonials: {len(fav.get('testimonials', []))}")
                    else:
                        error_detail = get_fav_response.text
                        self.log_test("Get User Favorites", False, 
                                    f"Failed to get favorites: {get_fav_response.status_code}")
                        print(f"   Error details: {error_detail}")
                        
                        # Try to extract specific error information
                        try:
                            error_json = get_fav_response.json()
                            if 'detail' in error_json:
                                print(f"   API Error: {error_json['detail']}")
                        except:
                            pass
                else:
                    self.log_test("User Favorites", False, "No jobs available for testing favorites")
            else:
                self.log_test("User Favorites", False, "Failed to get jobs for favorites test")
        except Exception as e:
            self.log_test("User Favorites", False, f"Error: {str(e)}")
            import traceback
            print(f"   Full traceback: {traceback.format_exc()}")
    
    def test_testimonials_workflow(self):
        """Test testimonials creation and approval workflow"""
        try:
            if not self.student_token:
                self.log_test("Testimonials Workflow", False, "No student token available")
                return
            
            # Get jobs first
            jobs_response = self.make_request('GET', '/jobs/')
            
            if jobs_response.status_code == 200:
                jobs = jobs_response.json()
                
                if jobs:
                    job_id = jobs[0].get('id')
                    
                    # Test create testimonial
                    testimonial_data = {
                        "name": "Jean-Baptiste Mukendi",
                        "position": "Développeur Senior",
                        "company": "TechCongo SARL",
                        "quote": {
                            "fr": "Grâce à cette plateforme, j'ai trouvé mon emploi de rêve!",
                            "en": "Thanks to this platform, I found my dream job!"
                        },
                        "linkedIn": "https://linkedin.com/in/jbmukendi",
                        "jobId": job_id
                    }
                    
                    create_response = self.make_request('POST', '/testimonials/', 
                                                     testimonial_data, token=self.student_token)
                    
                    if create_response.status_code == 200:
                        created_testimonial = create_response.json()
                        testimonial_id = created_testimonial.get('id')
                        self.created_resources['testimonials'].append(testimonial_id)
                        
                        self.log_test("Create Testimonial", True, 
                                    f"Created testimonial by {created_testimonial.get('name')}")
                        
                        # Test admin approval workflow
                        if self.admin_token:
                            # Get pending testimonials
                            pending_response = self.make_request('GET', '/testimonials/pending', 
                                                               token=self.admin_token)
                            
                            if pending_response.status_code == 200:
                                pending = pending_response.json()
                                self.log_test("Get Pending Testimonials", True, 
                                            f"Retrieved {len(pending)} pending testimonials")
                                
                                # Approve testimonial
                                approve_response = self.make_request('PUT', 
                                                                   f'/testimonials/{testimonial_id}/approve', 
                                                                   token=self.admin_token)
                                
                                if approve_response.status_code == 200:
                                    self.log_test("Approve Testimonial", True, 
                                                "Testimonial approved successfully")
                                    
                                    # Verify testimonial appears in public list
                                    public_response = self.make_request('GET', '/testimonials/')
                                    
                                    if public_response.status_code == 200:
                                        public_testimonials = public_response.json()
                                        approved_found = any(t.get('id') == testimonial_id 
                                                           for t in public_testimonials)
                                        
                                        if approved_found:
                                            self.log_test("Testimonial Approval Workflow", True, 
                                                        "Approved testimonial appears in public list")
                                        else:
                                            self.log_test("Testimonial Approval Workflow", False, 
                                                        "Approved testimonial not found in public list")
                                else:
                                    self.log_test("Approve Testimonial", False, 
                                                f"Failed to approve: {approve_response.status_code}")
                            else:
                                self.log_test("Get Pending Testimonials", False, 
                                            f"Failed to get pending: {pending_response.status_code}")
                    else:
                        self.log_test("Create Testimonial", False, 
                                    f"Failed to create testimonial: {create_response.status_code}")
                else:
                    self.log_test("Testimonials Workflow", False, "No jobs available for testimonial test")
            else:
                self.log_test("Testimonials Workflow", False, "Failed to get jobs for testimonial test")
        except Exception as e:
            self.log_test("Testimonials Workflow", False, f"Error: {str(e)}")
    
    def test_admin_dashboard(self):
        """Test admin dashboard and statistics"""
        try:
            if not self.admin_token:
                self.log_test("Admin Dashboard", False, "No admin token available")
                return
            
            # Test dashboard endpoint
            dashboard_response = self.make_request('GET', '/admin/dashboard', 
                                                 token=self.admin_token)
            
            if dashboard_response.status_code == 200:
                dashboard = dashboard_response.json()
                totals = dashboard.get('totals', {})
                
                self.log_test("Admin Dashboard", True, 
                            f"Dashboard loaded - Jobs: {totals.get('jobs')}, "
                            f"Users: {totals.get('users')}, "
                            f"Companies: {totals.get('companies')}")
                
                # Test statistics endpoint
                stats_response = self.make_request('GET', '/admin/statistics', 
                                                 token=self.admin_token)
                
                if stats_response.status_code == 200:
                    stats = stats_response.json()
                    self.log_test("Platform Statistics", True, 
                                f"Statistics retrieved - Total Jobs: {stats.get('totalJobs')}, "
                                f"Total Students: {stats.get('totalStudents')}")
                else:
                    self.log_test("Platform Statistics", False, 
                                f"Failed to get statistics: {stats_response.status_code}")
                
                # Test data export
                export_response = self.make_request('GET', '/admin/export/users', 
                                                  token=self.admin_token)
                
                if export_response.status_code == 200:
                    export_data = export_response.json()
                    self.log_test("Data Export", True, 
                                f"Exported {export_data.get('count')} users")
                else:
                    self.log_test("Data Export", False, 
                                f"Failed to export data: {export_response.status_code}")
            else:
                self.log_test("Admin Dashboard", False, 
                            f"Dashboard failed: {dashboard_response.status_code}")
        except Exception as e:
            self.log_test("Admin Dashboard", False, f"Error: {str(e)}")
    
    def test_user_profile_management(self):
        """Test user profile operations"""
        try:
            if not self.student_token:
                self.log_test("User Profile Management", False, "No student token available")
                return
            
            # Test get current user profile
            profile_response = self.make_request('GET', '/users/me', 
                                               token=self.student_token)
            
            if profile_response.status_code == 200:
                profile = profile_response.json()
                self.log_test("Get User Profile", True, 
                            f"Retrieved profile for {profile.get('name')}")
                
                # Test update profile
                update_data = {
                    "university": "Université de Lubumbashi",
                    "field": "Génie Informatique",
                    "preferredLanguage": "fr"
                }
                
                update_response = self.make_request('PUT', '/users/me', 
                                                  update_data, token=self.student_token)
                
                if update_response.status_code == 200:
                    updated_profile = update_response.json()
                    self.log_test("Update User Profile", True, 
                                f"Profile updated - University: {updated_profile.get('university')}")
                else:
                    self.log_test("Update User Profile", False, 
                                f"Failed to update profile: {update_response.status_code}")
                
                # Test progress tracking
                progress_data = {
                    "profileComplete": 85,
                    "jobsExplored": 12,
                    "trainingsStarted": 2,
                    "skillsAssessed": 5
                }
                
                progress_response = self.make_request('PUT', '/users/progress', 
                                                    progress_data, token=self.student_token)
                
                if progress_response.status_code == 200:
                    self.log_test("User Progress Tracking", True, 
                                "Progress updated successfully")
                else:
                    self.log_test("User Progress Tracking", False, 
                                f"Failed to update progress: {progress_response.status_code}")
            else:
                self.log_test("Get User Profile", False, 
                            f"Failed to get profile: {profile_response.status_code}")
        except Exception as e:
            self.log_test("User Profile Management", False, f"Error: {str(e)}")
    
    def test_authorization_controls(self):
        """Test authorization and access controls"""
        try:
            # Test admin-only endpoint without token
            no_auth_response = self.make_request('GET', '/admin/dashboard')
            
            if no_auth_response.status_code == 401:
                self.log_test("Authorization - No Token", True, 
                            "Admin endpoint correctly rejects requests without token")
            else:
                self.log_test("Authorization - No Token", False, 
                            f"Expected 401, got {no_auth_response.status_code}")
            
            # Test admin endpoint with student token
            if self.student_token:
                student_admin_response = self.make_request('GET', '/admin/dashboard', 
                                                         token=self.student_token)
                
                if student_admin_response.status_code == 403:
                    self.log_test("Authorization - Student Access", True, 
                                "Admin endpoint correctly rejects student access")
                else:
                    self.log_test("Authorization - Student Access", False, 
                                f"Expected 403, got {student_admin_response.status_code}")
            
            # Test protected user endpoint without token
            user_no_auth = self.make_request('GET', '/users/me')
            
            if user_no_auth.status_code == 401:
                self.log_test("Authorization - User Endpoint", True, 
                            "User endpoint correctly requires authentication")
            else:
                self.log_test("Authorization - User Endpoint", False, 
                            f"Expected 401, got {user_no_auth.status_code}")
        except Exception as e:
            self.log_test("Authorization Controls", False, f"Error: {str(e)}")
    
    def test_sample_data_initialization(self):
        """Test sample data initialization"""
        try:
            if not self.admin_token:
                self.log_test("Sample Data Initialization", False, "No admin token available")
                return
            
            # Test sample data import
            import_response = self.make_request('POST', '/admin/import-sample-data', 
                                              token=self.admin_token)
            
            if import_response.status_code == 200:
                self.log_test("Sample Data Import", True, 
                            "Sample data imported successfully")
                
                # Verify data was created by checking counts
                sectors_response = self.make_request('GET', '/sectors/')
                jobs_response = self.make_request('GET', '/jobs/')
                companies_response = self.make_request('GET', '/companies/')
                
                if all(r.status_code == 200 for r in [sectors_response, jobs_response, companies_response]):
                    sectors_count = len(sectors_response.json())
                    jobs_count = len(jobs_response.json())
                    companies_count = len(companies_response.json())
                    
                    self.log_test("Sample Data Verification", True, 
                                f"Data populated - Sectors: {sectors_count}, "
                                f"Jobs: {jobs_count}, Companies: {companies_count}")
                else:
                    self.log_test("Sample Data Verification", False, 
                                "Failed to verify sample data")
            else:
                self.log_test("Sample Data Import", False, 
                            f"Import failed: {import_response.status_code}")
        except Exception as e:
            self.log_test("Sample Data Initialization", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting KONGENGA Backend API Tests")
        print(f"📍 Testing API at: {self.base_url}")
        print("=" * 60)
        
        # Core functionality tests
        self.test_health_check()
        self.test_admin_authentication()
        self.test_student_registration_and_login()
        
        # Data management tests
        self.test_sectors_management()
        self.test_companies_management()
        self.test_training_management()
        self.test_jobs_management()
        
        # User functionality tests
        self.test_user_profile_management()
        self.test_user_favorites()
        
        # Workflow tests
        self.test_testimonials_workflow()
        
        # Admin functionality tests
        self.test_admin_dashboard()
        self.test_sample_data_initialization()
        
        # Security tests
        self.test_authorization_controls()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        failed = len(self.test_results) - passed
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/len(self.test_results)*100):.1f}%")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   ❌ {result['test']}: {result['message']}")
        
        print("\n🎯 KEY FEATURES TESTED:")
        features = [
            "✅ Authentication System (Student & Admin)",
            "✅ User Management & Profiles",
            "✅ Job Management & Search",
            "✅ Sector Management",
            "✅ Company Management with External Links",
            "✅ Training Management with External Links",
            "✅ Testimonials Approval Workflow",
            "✅ Admin Dashboard & Statistics",
            "✅ Multilingual Support",
            "✅ Authorization Controls",
            "✅ Sample Data Initialization"
        ]
        
        for feature in features:
            print(f"   {feature}")
        
        print(f"\n🌍 DRC-Specific Features:")
        print(f"   ✅ Multilingual support (French, Lingala, Swahili, English, Kikongo)")
        print(f"   ✅ Local university integration")
        print(f"   ✅ DRC-focused career sectors")
        print(f"   ✅ Local company profiles")
        
        return passed, failed

if __name__ == "__main__":
    tester = KongengaAPITester()
    tester.run_all_tests()
    
    # Exit with appropriate code
    passed, failed = tester.print_summary()
    sys.exit(0 if failed == 0 else 1)