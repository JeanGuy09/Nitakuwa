-- KONGENGA Sample Data for MySQL
-- Insert default admin user
INSERT INTO users (email, password, full_name, role) VALUES 
('admin@kongenga.cd', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrateur KONGENGA', 'site_manager'),
('student@kongenga.cd', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Étudiant Test', 'student');

-- Insert sectors
INSERT INTO sectors (name_fr, name_en, description_fr, description_en, icon, gradient, job_count, growth) VALUES 
('Technologie', 'Technology', 'Le secteur technologique en RDC connaît une croissance rapide avec des opportunités dans le développement logiciel, les télécommunications et l\'innovation numérique.', 'The technology sector in DRC is experiencing rapid growth with opportunities in software development, telecommunications and digital innovation.', '💻', 'linear-gradient(135deg, #3b82f6, #2563eb)', 15, 'Très élevée'),

('Santé', 'Health', 'Le secteur de la santé offre des opportunités cruciales pour améliorer les soins médicaux et l\'accès aux services de santé pour la population congolaise.', 'The health sector offers crucial opportunities to improve medical care and access to health services for the Congolese population.', '🏥', 'linear-gradient(135deg, #10b981, #059669)', 22, 'Élevée'),

('Éducation', 'Education', 'L\'éducation est un pilier fondamental du développement. Ce secteur offre des opportunités d\'enseignement, de formation et de développement pédagogique.', 'Education is a fundamental pillar of development. This sector offers opportunities for teaching, training and pedagogical development.', '📚', 'linear-gradient(135deg, #f59e0b, #d97706)', 18, 'Stable'),

('Agriculture', 'Agriculture', 'L\'agriculture moderne et durable représente un énorme potentiel pour la RDC, avec des opportunités dans l\'agrotechnologie et la transformation alimentaire.', 'Modern and sustainable agriculture represents enormous potential for DRC, with opportunities in agrotechnology and food processing.', '🌾', 'linear-gradient(135deg, #84cc16, #65a30d)', 25, 'Très élevée'),

('Mines et Ressources', 'Mining & Resources', 'Le secteur minier, pilier de l\'économie congolaise, offre des opportunités dans l\'extraction durable, la géologie et la transformation des minerais.', 'The mining sector, pillar of the Congolese economy, offers opportunities in sustainable extraction, geology and mineral processing.', '⛏️', 'linear-gradient(135deg, #8b5cf6, #7c3aed)', 12, 'Modérée'),

('Finance et Économie', 'Finance & Economics', 'Le secteur financier en développement offre des opportunités dans la banque, l\'assurance, la microfinance et les technologies financières.', 'The developing financial sector offers opportunities in banking, insurance, microfinance and financial technologies.', '💰', 'linear-gradient(135deg, #06b6d4, #0891b2)', 20, 'Élevée');

-- Insert jobs for Technology sector
INSERT INTO jobs (sector_id, title_fr, title_en, description_fr, description_en, required_studies_fr, required_studies_en, salary_min, salary_max) VALUES 
(1, 'Développeur Web Full-Stack', 'Full-Stack Web Developer', 'Concevoir et développer des applications web complètes en utilisant les dernières technologies. Travailler sur des projets innovants pour des entreprises locales et internationales.', 'Design and develop complete web applications using the latest technologies. Work on innovative projects for local and international companies.', 'Licence en Informatique, Ingénierie Logicielle ou équivalent. Maîtrise de JavaScript, Python, PHP, bases de données.', 'Bachelor\'s degree in Computer Science, Software Engineering or equivalent. Proficiency in JavaScript, Python, PHP, databases.', 800, 2000),

(1, 'Analyste de Données', 'Data Analyst', 'Analyser les données pour aider les entreprises à prendre des décisions éclairées. Créer des visualisations et des rapports détaillés.', 'Analyze data to help businesses make informed decisions. Create visualizations and detailed reports.', 'Licence en Statistiques, Mathématiques, Informatique. Maîtrise de Python, R, SQL, outils de visualisation.', 'Bachelor\'s degree in Statistics, Mathematics, Computer Science. Proficiency in Python, R, SQL, visualization tools.', 700, 1800),

(1, 'Ingénieur DevOps', 'DevOps Engineer', 'Optimiser les processus de développement et de déploiement. Gérer l\'infrastructure cloud et automatiser les workflows.', 'Optimize development and deployment processes. Manage cloud infrastructure and automate workflows.', 'Ingénieur en Informatique. Expérience avec AWS/Azure, Docker, Kubernetes, CI/CD.', 'Computer Engineering degree. Experience with AWS/Azure, Docker, Kubernetes, CI/CD.', 1000, 2500);

-- Insert jobs for Health sector  
INSERT INTO jobs (sector_id, title_fr, title_en, description_fr, description_en, required_studies_fr, required_studies_en, salary_min, salary_max) VALUES 
(2, 'Médecin Généraliste', 'General Practitioner', 'Fournir des soins médicaux primaires à la population. Diagnostiquer et traiter diverses conditions médicales.', 'Provide primary medical care to the population. Diagnose and treat various medical conditions.', 'Doctorat en Médecine. Licence d\'exercice valide en RDC.', 'Medical Doctorate. Valid medical license in DRC.', 1200, 3000),

(2, 'Infirmier Spécialisé', 'Specialized Nurse', 'Prodiguer des soins infirmiers spécialisés dans différents services hospitaliers.', 'Provide specialized nursing care in various hospital departments.', 'Diplôme d\'État d\'Infirmier. Spécialisation dans un domaine spécifique.', 'State Nursing Diploma. Specialization in a specific field.', 400, 800);

-- Insert jobs for Education sector
INSERT INTO jobs (sector_id, title_fr, title_en, description_fr, description_en, required_studies_fr, required_studies_en, salary_min, salary_max) VALUES 
(3, 'Professeur d\'Université', 'University Professor', 'Enseigner et mener des recherches dans une discipline académique. Encadrer les étudiants et publier des travaux scientifiques.', 'Teach and conduct research in an academic discipline. Supervise students and publish scientific work.', 'Doctorat dans la discipline d\'enseignement. Expérience en recherche et publications.', 'PhD in teaching discipline. Research experience and publications.', 800, 2000),

(3, 'Conseiller Pédagogique', 'Educational Counselor', 'Accompagner les étudiants dans leur parcours académique et professionnel. Développer des programmes d\'orientation.', 'Support students in their academic and professional journey. Develop guidance programs.', 'Master en Psychologie de l\'Éducation ou Sciences de l\'Éducation.', 'Master\'s in Educational Psychology or Education Sciences.', 500, 1200);

-- Insert companies
INSERT INTO companies (name, description_fr, description_en, website_url, website_name) VALUES 
('Vodacom Congo', 'Leader des télécommunications en RDC, Vodacom offre des services innovants de téléphonie mobile et internet.', 'Telecommunications leader in DRC, Vodacom offers innovative mobile and internet services.', 'https://vodacom.cd', 'Site officiel Vodacom'),

('Airtel RDC', 'Opérateur de télécommunications offrant des solutions mobiles et digitales avancées.', 'Telecommunications operator offering advanced mobile and digital solutions.', 'https://airtel.cd', 'Site officiel Airtel'),

('BIAC', 'Banque leader en RDC offrant des services bancaires complets aux particuliers et entreprises.', 'Leading bank in DRC offering comprehensive banking services to individuals and businesses.', 'https://biac.cd', 'Site officiel BIAC'),

('Université de Kinshasa', 'Plus ancienne université de la RDC, centre d\'excellence académique et de recherche.', 'Oldest university in DRC, center of academic excellence and research.', 'https://unikin.ac.cd', 'Site officiel UNIKIN'),

('Hôpital Général de Kinshasa', 'Hôpital de référence offrant des soins médicaux de qualité à la population congolaise.', 'Reference hospital providing quality medical care to the Congolese population.', 'https://hgk.cd', 'Site officiel HGK');

-- Insert testimonials
INSERT INTO testimonials (job_id, user_name, user_role, quote_fr, quote_en, status) VALUES 
(1, 'Jean-Pierre Mukendi', 'Développeur Senior', 'Grâce à KONGENGA, j\'ai découvert ma passion pour le développement web. Aujourd\'hui, je travaille pour une startup innovante à Kinshasa.', 'Thanks to KONGENGA, I discovered my passion for web development. Today, I work for an innovative startup in Kinshasa.', 'approved'),

(2, 'Marie Kalala', 'Data Scientist', 'KONGENGA m\'a aidée à comprendre les opportunités dans l\'analyse de données. Je contribue maintenant à des projets d\'impact social.', 'KONGENGA helped me understand opportunities in data analysis. I now contribute to social impact projects.', 'approved'),

(4, 'Dr. Pauline Tshikudi', 'Médecin', 'La plateforme m\'a permis de découvrir les besoins du secteur de la santé en RDC. C\'est gratifiant de servir ma communauté.', 'The platform allowed me to discover the needs of the health sector in DRC. It\'s rewarding to serve my community.', 'approved');