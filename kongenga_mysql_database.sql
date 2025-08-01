-- ================================================
-- KONGENGA Career Platform - MySQL Database Structure
-- Democratic Republic of Congo Career Platform
-- ================================================

-- Create database
CREATE DATABASE IF NOT EXISTS kongenga_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kongenga_db;

-- ================================================
-- TABLE: users
-- User accounts (students and administrators)
-- ================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('student', 'site_manager') DEFAULT 'student',
    university VARCHAR(255) NULL,
    field VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    city VARCHAR(100) NULL,
    birth_date DATE NULL,
    gender ENUM('male', 'female', 'other') NULL,
    profile_completed TINYINT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active),
    INDEX idx_created (created_at)
);

-- ================================================
-- TABLE: sectors
-- Economic sectors in DRC
-- ================================================
CREATE TABLE sectors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NULL,
    name_ln VARCHAR(255) NULL COMMENT 'Lingala',
    name_sw VARCHAR(255) NULL COMMENT 'Swahili', 
    name_kg VARCHAR(255) NULL COMMENT 'Kikongo',
    description_fr TEXT NULL,
    description_en TEXT NULL,
    description_ln TEXT NULL,
    description_sw TEXT NULL,
    description_kg TEXT NULL,
    icon VARCHAR(10) DEFAULT '🏢',
    gradient VARCHAR(100) DEFAULT 'linear-gradient(135deg, #3b82f6, #2563eb)',
    job_count INT DEFAULT 0,
    growth VARCHAR(50) DEFAULT 'Stable',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order),
    FULLTEXT idx_search_fr (name_fr, description_fr),
    FULLTEXT idx_search_en (name_en, description_en)
);

-- ================================================
-- TABLE: companies
-- Companies and organizations
-- ================================================
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description_fr TEXT NULL,
    description_en TEXT NULL,
    description_ln TEXT NULL,
    description_sw TEXT NULL,
    description_kg TEXT NULL,
    website_url VARCHAR(500) NULL,
    website_name VARCHAR(255) NULL,
    logo_url VARCHAR(500) NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    city VARCHAR(100) NULL,
    province VARCHAR(100) NULL,
    employee_count VARCHAR(50) NULL,
    industry VARCHAR(100) NULL,
    founded_year YEAR NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    INDEX idx_city (city),
    INDEX idx_industry (industry),
    FULLTEXT idx_search (name, description_fr, description_en)
);

-- ================================================
-- TABLE: training
-- Training programs and courses
-- ================================================
CREATE TABLE training (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NULL,
    title_ln VARCHAR(255) NULL,
    title_sw VARCHAR(255) NULL,
    title_kg VARCHAR(255) NULL,
    description_fr TEXT NULL,
    description_en TEXT NULL,
    description_ln TEXT NULL,
    description_sw TEXT NULL,
    description_kg TEXT NULL,
    provider VARCHAR(255) NULL,
    duration VARCHAR(100) NULL,
    level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    price DECIMAL(10,2) NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    online_url VARCHAR(500) NULL,
    certificate BOOLEAN DEFAULT FALSE,
    requirements_fr TEXT NULL,
    requirements_en TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_level (level),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search_fr (title_fr, description_fr),
    FULLTEXT idx_search_en (title_en, description_en)
);

-- ================================================
-- TABLE: jobs
-- Job opportunities
-- ================================================
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sector_id INT NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NULL,
    title_ln VARCHAR(255) NULL,
    title_sw VARCHAR(255) NULL,
    title_kg VARCHAR(255) NULL,
    description_fr TEXT NULL,
    description_en TEXT NULL,
    description_ln TEXT NULL,
    description_sw TEXT NULL,
    description_kg TEXT NULL,
    required_studies_fr TEXT NULL,
    required_studies_en TEXT NULL,
    required_studies_ln TEXT NULL,
    required_studies_sw TEXT NULL,
    required_studies_kg TEXT NULL,
    required_skills_fr TEXT NULL,
    required_skills_en TEXT NULL,
    responsibilities_fr TEXT NULL,
    responsibilities_en TEXT NULL,
    salary_min DECIMAL(10,2) NULL,
    salary_max DECIMAL(10,2) NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    employment_type ENUM('full_time', 'part_time', 'contract', 'internship') DEFAULT 'full_time',
    experience_level ENUM('entry', 'mid', 'senior', 'executive') DEFAULT 'entry',
    location VARCHAR(255) NULL,
    remote_allowed BOOLEAN DEFAULT FALSE,
    application_deadline DATE NULL,
    contact_email VARCHAR(255) NULL,
    application_url VARCHAR(500) NULL,
    view_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (sector_id) REFERENCES sectors(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    INDEX idx_sector (sector_id),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    INDEX idx_employment_type (employment_type),
    INDEX idx_experience_level (experience_level),
    INDEX idx_location (location),
    INDEX idx_salary (salary_min, salary_max),
    INDEX idx_deadline (application_deadline),
    FULLTEXT idx_search_fr (title_fr, description_fr, required_skills_fr),
    FULLTEXT idx_search_en (title_en, description_en, required_skills_en)
);

-- ================================================
-- TABLE: job_companies
-- Many-to-many relationship between jobs and companies
-- ================================================
CREATE TABLE job_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    company_id INT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    UNIQUE KEY unique_job_company (job_id, company_id),
    INDEX idx_job (job_id),
    INDEX idx_company (company_id),
    INDEX idx_primary (is_primary)
);

-- ================================================
-- TABLE: job_training
-- Many-to-many relationship between jobs and training
-- ================================================
CREATE TABLE job_training (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    training_id INT NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (training_id) REFERENCES training(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    UNIQUE KEY unique_job_training (job_id, training_id),
    INDEX idx_job (job_id),
    INDEX idx_training (training_id),
    INDEX idx_required (is_required)
);

-- ================================================
-- TABLE: user_favorites
-- User's favorite jobs
-- ================================================
CREATE TABLE user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    UNIQUE KEY unique_favorite (user_id, job_id),
    INDEX idx_user (user_id),
    INDEX idx_job (job_id),
    INDEX idx_created (created_at)
);

-- ================================================
-- TABLE: testimonials
-- User testimonials for jobs/careers
-- ================================================
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NULL,
    sector_id INT NULL,
    user_id INT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NULL,
    user_company VARCHAR(255) NULL,
    quote_fr TEXT NOT NULL,
    quote_en TEXT NULL,
    quote_ln TEXT NULL,
    quote_sw TEXT NULL,
    quote_kg TEXT NULL,
    rating TINYINT NULL CHECK (rating >= 1 AND rating <= 5),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_notes TEXT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sectors(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    
    INDEX idx_job (job_id),
    INDEX idx_sector (sector_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_rating (rating)
);

-- ================================================
-- TABLE: user_progress
-- Track user progress and activities
-- ================================================
CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    jobs_viewed INT DEFAULT 0,
    jobs_applied INT DEFAULT 0,
    sectors_explored INT DEFAULT 0,
    training_started INT DEFAULT 0,
    training_completed INT DEFAULT 0,
    profile_completion TINYINT DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    UNIQUE KEY unique_user_progress (user_id),
    INDEX idx_last_activity (last_activity)
);

-- ================================================
-- TABLE: job_applications
-- Track job applications
-- ================================================
CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('applied', 'reviewed', 'interviewed', 'accepted', 'rejected') DEFAULT 'applied',
    cover_letter TEXT NULL,
    resume_url VARCHAR(500) NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    UNIQUE KEY unique_application (job_id, user_id),
    INDEX idx_job (job_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_applied (applied_at)
);

-- ================================================
-- TABLE: site_settings
-- Configuration settings for the site
-- ================================================
CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NULL,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public)
);

-- ================================================
-- TABLE: activity_logs
-- Track user activities and system events
-- ================================================
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NULL,
    entity_id INT NULL,
    description TEXT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created (created_at)
);

-- ================================================
-- TRIGGERS: Update job counts automatically
-- ================================================

DELIMITER //

-- Update sector job count when job is inserted
CREATE TRIGGER update_sector_job_count_insert
AFTER INSERT ON jobs
FOR EACH ROW
BEGIN
    UPDATE sectors 
    SET job_count = (
        SELECT COUNT(*) 
        FROM jobs 
        WHERE sector_id = NEW.sector_id AND is_active = TRUE
    )
    WHERE id = NEW.sector_id;
END//

-- Update sector job count when job is updated
CREATE TRIGGER update_sector_job_count_update
AFTER UPDATE ON jobs
FOR EACH ROW
BEGIN
    -- Update old sector if sector changed
    IF OLD.sector_id != NEW.sector_id THEN
        UPDATE sectors 
        SET job_count = (
            SELECT COUNT(*) 
            FROM jobs 
            WHERE sector_id = OLD.sector_id AND is_active = TRUE
        )
        WHERE id = OLD.sector_id;
    END IF;
    
    -- Update new sector
    UPDATE sectors 
    SET job_count = (
        SELECT COUNT(*) 
        FROM jobs 
        WHERE sector_id = NEW.sector_id AND is_active = TRUE
    )
    WHERE id = NEW.sector_id;
END//

-- Update sector job count when job is deleted
CREATE TRIGGER update_sector_job_count_delete
AFTER DELETE ON jobs
FOR EACH ROW
BEGIN
    UPDATE sectors 
    SET job_count = (
        SELECT COUNT(*) 
        FROM jobs 
        WHERE sector_id = OLD.sector_id AND is_active = TRUE
    )
    WHERE id = OLD.sector_id;
END//

-- Update job view count
CREATE TRIGGER increment_job_views
AFTER INSERT ON activity_logs
FOR EACH ROW
BEGIN
    IF NEW.action = 'view_job' AND NEW.entity_type = 'job' THEN
        UPDATE jobs 
        SET view_count = view_count + 1 
        WHERE id = NEW.entity_id;
    END IF;
END//

DELIMITER ;

-- ================================================
-- INSERT DEFAULT DATA
-- ================================================

-- Default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'KONGENGA', 'string', 'Site name', TRUE),
('site_description', 'Plateforme de carrières pour la République Démocratique du Congo', 'string', 'Site description', TRUE),
('default_language', 'fr', 'string', 'Default site language', TRUE),
('maintenance_mode', '0', 'boolean', 'Maintenance mode status', FALSE),
('registration_enabled', '1', 'boolean', 'User registration enabled', FALSE),
('email_verification_required', '0', 'boolean', 'Email verification required for registration', FALSE),
('max_favorites_per_user', '50', 'number', 'Maximum favorites per user', FALSE);

-- Default admin user (password is 'admin123')
INSERT INTO users (email, password, full_name, role, is_active, email_verified, profile_completed) VALUES
('admin@kongenga.cd', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrateur KONGENGA', 'site_manager', TRUE, TRUE, 100);

-- Default student user (password is 'student123')
INSERT INTO users (email, password, full_name, role, university, field, is_active, email_verified, profile_completed) VALUES
('student@kongenga.cd', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Étudiant Test', 'student', 'Université de Kinshasa', 'Informatique', TRUE, TRUE, 75);

-- ================================================
-- INSERT SAMPLE SECTORS
-- ================================================
INSERT INTO sectors (name_fr, name_en, name_ln, name_sw, name_kg, description_fr, description_en, icon, gradient, growth, sort_order) VALUES
('Technologie', 'Technology', 'Tekinoloji', 'Teknolojia', 'Teknoloji', 
'Le secteur technologique en RDC connaît une croissance rapide avec des opportunités dans le développement logiciel, les télécommunications et l\'innovation numérique.',
'The technology sector in DRC is experiencing rapid growth with opportunities in software development, telecommunications and digital innovation.',
'💻', 'linear-gradient(135deg, #3b82f6, #2563eb)', 'Très élevée', 1),

('Santé', 'Health', 'Bokolongono', 'Afya', 'Mvuama', 
'Le secteur de la santé offre des opportunités cruciales pour améliorer les soins médicaux et l\'accès aux services de santé pour la population congolaise.',
'The health sector offers crucial opportunities to improve medical care and access to health services for the Congolese population.',
'🏥', 'linear-gradient(135deg, #10b981, #059669)', 'Élevée', 2),

('Éducation', 'Education', 'Kelasi', 'Elimu', 'Longinu', 
'L\'éducation est un pilier fondamental du développement. Ce secteur offre des opportunités d\'enseignement, de formation et de développement pédagogique.',
'Education is a fundamental pillar of development. This sector offers opportunities for teaching, training and pedagogical development.',
'📚', 'linear-gradient(135deg, #f59e0b, #d97706)', 'Stable', 3),

('Agriculture', 'Agriculture', 'Bilanga', 'Kilimo', 'Kilima', 
'L\'agriculture moderne et durable représente un énorme potentiel pour la RDC, avec des opportunités dans l\'agrotechnologie et la transformation alimentaire.',
'Modern and sustainable agriculture represents enormous potential for DRC, with opportunities in agrotechnology and food processing.',
'🌾', 'linear-gradient(135deg, #84cc16, #65a30d)', 'Très élevée', 4),

('Mines et Ressources', 'Mining & Resources', 'Mabanga', 'Madini', 'Matadi', 
'Le secteur minier, pilier de l\'économie congolaise, offre des opportunités dans l\'extraction durable, la géologie et la transformation des minerais.',
'The mining sector, pillar of the Congolese economy, offers opportunities in sustainable extraction, geology and mineral processing.',
'⛏️', 'linear-gradient(135deg, #8b5cf6, #7c3aed)', 'Modérée', 5),

('Finance et Économie', 'Finance & Economics', 'Mbongo', 'Fedha', 'Zimbu', 
'Le secteur financier en développement offre des opportunités dans la banque, l\'assurance, la microfinance et les technologies financières.',
'The developing financial sector offers opportunities in banking, insurance, microfinance and financial technologies.',
'💰', 'linear-gradient(135deg, #06b6d4, #0891b2)', 'Élevée', 6);

-- ================================================
-- INSERT SAMPLE COMPANIES
-- ================================================
INSERT INTO companies (name, description_fr, description_en, website_url, website_name, city, province, industry, founded_year, is_featured) VALUES
('Vodacom Congo', 
'Leader des télécommunications en RDC, Vodacom offre des services innovants de téléphonie mobile et internet.',
'Telecommunications leader in DRC, Vodacom offers innovative mobile and internet services.',
'https://vodacom.cd', 'Site officiel Vodacom', 'Kinshasa', 'Kinshasa', 'Télécommunications', 2002, TRUE),

('Airtel RDC', 
'Opérateur de télécommunications offrant des solutions mobiles et digitales avancées.',
'Telecommunications operator offering advanced mobile and digital solutions.',
'https://airtel.cd', 'Site officiel Airtel', 'Kinshasa', 'Kinshasa', 'Télécommunications', 2012, TRUE),

('BIAC (Banque Internationale pour l\'Afrique au Congo)', 
'Banque leader en RDC offrant des services bancaires complets aux particuliers et entreprises.',
'Leading bank in DRC offering comprehensive banking services to individuals and businesses.',
'https://biac.cd', 'Site officiel BIAC', 'Kinshasa', 'Kinshasa', 'Services financiers', 1970, TRUE),

('Université de Kinshasa (UNIKIN)', 
'Plus ancienne université de la RDC, centre d\'excellence académique et de recherche.',
'Oldest university in DRC, center of academic excellence and research.',
'https://unikin.ac.cd', 'Site officiel UNIKIN', 'Kinshasa', 'Kinshasa', 'Éducation', 1954, TRUE),

('Hôpital Général de Kinshasa', 
'Hôpital de référence offrant des soins médicaux de qualité à la population congolaise.',
'Reference hospital providing quality medical care to the Congolese population.',
'https://hgk.cd', 'Site officiel HGK', 'Kinshasa', 'Kinshasa', 'Santé', 1982, FALSE),

('Gécamines', 
'Société minière publique, acteur majeur de l\'extraction minière en RDC.',
'Public mining company, major player in mining extraction in DRC.',
'https://gecamines.cd', 'Site officiel Gécamines', 'Lubumbashi', 'Haut-Katanga', 'Mines', 1967, TRUE);

-- ================================================
-- INSERT SAMPLE TRAINING PROGRAMS
-- ================================================
INSERT INTO training (title_fr, title_en, description_fr, description_en, provider, duration, level, price, online_url, certificate) VALUES
('Développement Web Full-Stack', 'Full-Stack Web Development',
'Formation complète en développement web moderne avec JavaScript, React, Node.js et bases de données.',
'Complete training in modern web development with JavaScript, React, Node.js and databases.',
'KONGENGA Academy', '6 mois', 'intermediate', 500.00, 'https://academy.kongenga.cd/fullstack', TRUE),

('Introduction à l\'Analyse de Données', 'Introduction to Data Analysis',
'Apprenez les bases de l\'analyse de données avec Python, pandas et visualisation.',
'Learn the basics of data analysis with Python, pandas and visualization.',
'Tech Skills RDC', '3 mois', 'beginner', 300.00, 'https://techskills.cd/data', TRUE),

('Gestion de Projet Agile', 'Agile Project Management',
'Maîtrisez les méthodologies agiles pour la gestion de projets technologiques.',
'Master agile methodologies for technology project management.',
'Business Academy Kinshasa', '2 mois', 'intermediate', 250.00, 'https://bak.cd/agile', TRUE);

-- ================================================
-- INSERT SAMPLE JOBS
-- ================================================
INSERT INTO jobs (sector_id, title_fr, title_en, description_fr, description_en, required_studies_fr, required_studies_en, required_skills_fr, required_skills_en, salary_min, salary_max, employment_type, experience_level, location) VALUES
-- Technology Sector Jobs
(1, 'Développeur Web Full-Stack', 'Full-Stack Web Developer',
'Concevoir et développer des applications web complètes en utilisant les dernières technologies. Travailler sur des projets innovants pour des entreprises locales et internationales.',
'Design and develop complete web applications using the latest technologies. Work on innovative projects for local and international companies.',
'Licence en Informatique, Ingénierie Logicielle ou équivalent. Maîtrise de JavaScript, Python, PHP, bases de données.',
'Bachelor\'s degree in Computer Science, Software Engineering or equivalent. Proficiency in JavaScript, Python, PHP, databases.',
'JavaScript, React, Node.js, PHP, MySQL, Git, API REST',
'JavaScript, React, Node.js, PHP, MySQL, Git, REST API',
800, 2000, 'full_time', 'mid', 'Kinshasa'),

(1, 'Analyste de Données', 'Data Analyst',
'Analyser les données pour aider les entreprises à prendre des décisions éclairées. Créer des visualisations et des rapports détaillés.',
'Analyze data to help businesses make informed decisions. Create visualizations and detailed reports.',
'Licence en Statistiques, Mathématiques, Informatique. Maîtrise de Python, R, SQL, outils de visualisation.',
'Bachelor\'s degree in Statistics, Mathematics, Computer Science. Proficiency in Python, R, SQL, visualization tools.',
'Python, R, SQL, Tableau, Power BI, Excel, Statistiques',
'Python, R, SQL, Tableau, Power BI, Excel, Statistics',
700, 1800, 'full_time', 'entry', 'Kinshasa'),

-- Health Sector Jobs  
(2, 'Médecin Généraliste', 'General Practitioner',
'Fournir des soins médicaux primaires à la population. Diagnostiquer et traiter diverses conditions médicales.',
'Provide primary medical care to the population. Diagnose and treat various medical conditions.',
'Doctorat en Médecine. Licence d\'exercice valide en RDC.',
'Medical Doctorate. Valid medical license in DRC.',
'Diagnostic médical, Soins primaires, Communication, Empathie',
'Medical diagnosis, Primary care, Communication, Empathy',
1200, 3000, 'full_time', 'mid', 'Kinshasa'),

(2, 'Infirmier Spécialisé', 'Specialized Nurse',
'Prodiguer des soins infirmiers spécialisés dans différents services hospitaliers.',
'Provide specialized nursing care in various hospital departments.',
'Diplôme d\'État d\'Infirmier. Spécialisation dans un domaine spécifique.',
'State Nursing Diploma. Specialization in a specific field.',
'Soins infirmiers, Gestion des médicaments, Urgences médicales',
'Nursing care, Medication management, Medical emergencies',
400, 800, 'full_time', 'entry', 'Kinshasa'),

-- Education Sector Jobs
(3, 'Professeur d\'Université', 'University Professor',
'Enseigner et mener des recherches dans une discipline académique. Encadrer les étudiants et publier des travaux scientifiques.',
'Teach and conduct research in an academic discipline. Supervise students and publish scientific work.',
'Doctorat dans la discipline d\'enseignement. Expérience en recherche et publications.',
'PhD in teaching discipline. Research experience and publications.',
'Pédagogie, Recherche académique, Rédaction scientifique, Encadrement',
'Pedagogy, Academic research, Scientific writing, Mentoring',
800, 2000, 'full_time', 'senior', 'Kinshasa');

-- ================================================
-- LINK JOBS TO COMPANIES AND TRAINING
-- ================================================
INSERT INTO job_companies (job_id, company_id, is_primary) VALUES
(1, 1, TRUE), -- Full-Stack Developer at Vodacom
(1, 2, FALSE), -- Also at Airtel
(2, 3, TRUE), -- Data Analyst at BIAC
(3, 5, TRUE), -- Doctor at Hospital
(4, 5, TRUE), -- Nurse at Hospital
(5, 4, TRUE); -- Professor at UNIKIN

INSERT INTO job_training (job_id, training_id, is_required) VALUES
(1, 1, TRUE), -- Full-Stack job requires Full-Stack training
(2, 2, TRUE), -- Data Analyst requires Data Analysis training
(1, 3, FALSE), -- Full-Stack developer could benefit from Agile training
(2, 3, FALSE); -- Data Analyst could benefit from Agile training

-- ================================================
-- INSERT SAMPLE TESTIMONIALS
-- ================================================
INSERT INTO testimonials (job_id, user_name, user_role, user_company, quote_fr, quote_en, rating, status, is_featured) VALUES
(1, 'Jean-Pierre Mukendi', 'Développeur Senior', 'Vodacom Congo',
'Grâce à KONGENGA, j\'ai découvert ma passion pour le développement web. Aujourd\'hui, je travaille pour une startup innovante à Kinshasa.',
'Thanks to KONGENGA, I discovered my passion for web development. Today, I work for an innovative startup in Kinshasa.',
5, 'approved', TRUE),

(2, 'Marie Kalala', 'Data Scientist', 'BIAC',
'KONGENGA m\'a aidée à comprendre les opportunités dans l\'analyse de données. Je contribue maintenant à des projets d\'impact social.',
'KONGENGA helped me understand opportunities in data analysis. I now contribute to social impact projects.',
5, 'approved', TRUE),

(3, 'Dr. Pauline Tshikudi', 'Médecin', 'Hôpital Général de Kinshasa',
'La plateforme m\'a permis de découvrir les besoins du secteur de la santé en RDC. C\'est gratifiant de servir ma communauté.',
'The platform allowed me to discover the needs of the health sector in DRC. It\'s rewarding to serve my community.',
5, 'approved', FALSE);

-- ================================================
-- CREATE VIEWS FOR COMMON QUERIES
-- ================================================

-- View for active jobs with sector and company information
CREATE VIEW active_jobs_view AS
SELECT 
    j.*,
    s.name_fr as sector_name_fr,
    s.name_en as sector_name_en,
    s.icon as sector_icon,
    GROUP_CONCAT(c.name SEPARATOR ', ') as company_names,
    COUNT(DISTINCT uf.id) as favorite_count
FROM jobs j
LEFT JOIN sectors s ON j.sector_id = s.id
LEFT JOIN job_companies jc ON j.id = jc.job_id
LEFT JOIN companies c ON jc.company_id = c.id
LEFT JOIN user_favorites uf ON j.id = uf.job_id
WHERE j.is_active = TRUE
GROUP BY j.id;

-- View for user statistics
CREATE VIEW user_stats_view AS
SELECT 
    u.id,
    u.full_name,
    u.email,
    u.role,
    u.created_at,
    COUNT(DISTINCT uf.id) as favorite_jobs_count,
    COUNT(DISTINCT ja.id) as applications_count,
    COALESCE(up.jobs_viewed, 0) as jobs_viewed,
    COALESCE(up.profile_completion, 0) as profile_completion
FROM users u
LEFT JOIN user_favorites uf ON u.id = uf.user_id
LEFT JOIN job_applications ja ON u.id = ja.user_id
LEFT JOIN user_progress up ON u.id = up.user_id
GROUP BY u.id;

-- ================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ================================================
-- Additional performance indexes
CREATE INDEX idx_jobs_active_sector ON jobs(is_active, sector_id);
CREATE INDEX idx_jobs_salary_range ON jobs(salary_min, salary_max) WHERE salary_min IS NOT NULL;
CREATE INDEX idx_jobs_location_active ON jobs(location, is_active);
CREATE INDEX idx_users_role_active ON users(role, is_active);
CREATE INDEX idx_testimonials_status_featured ON testimonials(status, is_featured);

-- ================================================
-- STORED PROCEDURES
-- ================================================

DELIMITER //

-- Get popular jobs (most viewed and favorited)
CREATE PROCEDURE GetPopularJobs(IN limit_count INT DEFAULT 10)
BEGIN
    SELECT 
        j.id,
        j.title_fr,
        j.title_en,
        j.view_count,
        COUNT(uf.id) as favorite_count,
        s.name_fr as sector_name
    FROM jobs j
    LEFT JOIN user_favorites uf ON j.id = uf.job_id
    LEFT JOIN sectors s ON j.sector_id = s.id
    WHERE j.is_active = TRUE
    GROUP BY j.id
    ORDER BY (j.view_count + COUNT(uf.id) * 2) DESC
    LIMIT limit_count;
END//

-- Get user recommendations based on profile
CREATE PROCEDURE GetUserRecommendations(IN user_id INT, IN limit_count INT DEFAULT 5)
BEGIN
    DECLARE user_field VARCHAR(255);
    
    SELECT field INTO user_field FROM users WHERE id = user_id;
    
    SELECT DISTINCT
        j.id,
        j.title_fr,
        j.title_en,
        j.salary_min,
        j.salary_max,
        s.name_fr as sector_name,
        CASE 
            WHEN j.required_skills_fr LIKE CONCAT('%', user_field, '%') THEN 3
            WHEN j.description_fr LIKE CONCAT('%', user_field, '%') THEN 2
            ELSE 1
        END as relevance_score
    FROM jobs j
    LEFT JOIN sectors s ON j.sector_id = s.id
    WHERE j.is_active = TRUE
    AND j.id NOT IN (
        SELECT job_id FROM user_favorites WHERE user_id = user_id
    )
    ORDER BY relevance_score DESC, j.created_at DESC
    LIMIT limit_count;
END//

DELIMITER ;

-- ================================================
-- SAMPLE DATA FOR USER PROGRESS
-- ================================================
INSERT INTO user_progress (user_id, jobs_viewed, sectors_explored, profile_completion) VALUES
(2, 12, 5, 75); -- For the test student

-- ================================================
-- FINAL STATISTICS UPDATE
-- ================================================
-- Update all sector job counts
UPDATE sectors s 
SET job_count = (
    SELECT COUNT(*) 
    FROM jobs j 
    WHERE j.sector_id = s.id AND j.is_active = TRUE
);

-- ================================================
-- SUCCESS MESSAGE
-- ================================================
SELECT 'KONGENGA Database structure created successfully!' as message,
       (SELECT COUNT(*) FROM users) as total_users,
       (SELECT COUNT(*) FROM sectors) as total_sectors,
       (SELECT COUNT(*) FROM jobs) as total_jobs,
       (SELECT COUNT(*) FROM companies) as total_companies;