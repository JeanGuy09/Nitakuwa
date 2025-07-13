from models import *
from datetime import datetime
import uuid

def get_sample_sectors():
    """Get sample sectors with multilingual support"""
    return [
        Sector(
            id="technology",
            name=MultilingualText(
                fr="Technologie",
                ln="Tekinoloji",
                sw="Teknolojia",
                en="Technology",
                kg="Teknolojia"
            ),
            description=MultilingualText(
                fr="Stimuler la transformation numérique et l'innovation en RDC",
                ln="Kotindisa mbongwana ya digitale na ba innovation na RDC",
                sw="Kuongoza mabadiliko ya kidijitali na uvumbuzi katika DRC",
                en="Drive digital transformation and innovation in the DRC",
                kg="Menga ya digital ye mabongolo mu DRC"
            ),
            icon="💻",
            color="from-blue-500 to-purple-600",
            growth="+15%",
            backgroundImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920"
        ),
        Sector(
            id="healthcare",
            name=MultilingualText(
                fr="Santé",
                ln="Bokolongono",
                sw="Afya",
                en="Healthcare",
                kg="Nlonguki"
            ),
            description=MultilingualText(
                fr="Améliorer les résultats de santé et l'infrastructure médicale",
                ln="Kobongisa makambo ya bokolongono na ba infrastructure ya monganga",
                sw="Kuboresha matokeo ya afya na miundombinu ya matibabu",
                en="Improve health outcomes and medical infrastructure",
                kg="Menga nlonguki ye ba infrastructure ya monganga"
            ),
            icon="🏥",
            color="from-green-500 to-teal-600",
            growth="+22%",
            backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920"
        ),
        Sector(
            id="education",
            name=MultilingualText(
                fr="Éducation",
                ln="Boyekoli",
                sw="Elimu",
                en="Education",
                kg="Nlonguki"
            ),
            description=MultilingualText(
                fr="Construire la capacité éducative et le capital humain",
                ln="Kotonga makoki ya boyekoli na ba moyindo ya bato",
                sw="Kujenga uwezo wa kielimu na mtaji wa kibinadamu",
                en="Build educational capacity and human capital",
                kg="Tonga makoki ya nlonguki ye ba moyindo ya bantu"
            ),
            icon="📚",
            color="from-yellow-500 to-orange-600",
            growth="+18%",
            backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920"
        ),
        Sector(
            id="finance",
            name=MultilingualText(
                fr="Finance et Banque",
                ln="Mbongo na Banki",
                sw="Fedha na Benki",
                en="Finance & Banking",
                kg="Mbongo ye Banki"
            ),
            description=MultilingualText(
                fr="Renforcer les systèmes financiers et la croissance économique",
                ln="Kolendisa ba système ya mbongo na bokoli ya ekonomi",
                sw="Kuimarisha mifumo ya kifedha na ukuaji wa kiuchumi",
                en="Strengthen financial systems and economic growth",
                kg="Lendisa ba système ya mbongo ye bokoli ya ekonomi"
            ),
            icon="💰",
            color="from-emerald-500 to-green-600",
            growth="+12%",
            backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920"
        ),
        Sector(
            id="engineering",
            name=MultilingualText(
                fr="Ingénierie",
                ln="Ingénierie",
                sw="Uhandisi",
                en="Engineering",
                kg="Ingénierie"
            ),
            description=MultilingualText(
                fr="Construire l'infrastructure et la capacité industrielle",
                ln="Kotonga ba infrastructure na makoki ya ba usine",
                sw="Kujenga miundombinu na uwezo wa viwanda",
                en="Build infrastructure and industrial capacity",
                kg="Tonga ba infrastructure ye makoki ya ba usine"
            ),
            icon="⚙️",
            color="from-gray-500 to-slate-600",
            growth="+20%",
            backgroundImage="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920"
        ),
        Sector(
            id="creative",
            name=MultilingualText(
                fr="Arts Créatifs",
                ln="Ba Arts ya bokeli",
                sw="Sanaa za Ubunifu",
                en="Creative Arts",
                kg="Ba Arts ya bokeli"
            ),
            description=MultilingualText(
                fr="Promouvoir l'expression culturelle et l'économie créative",
                ln="Kotombola ndenge ya mimeseno ya culture na ekonomi ya bokeli",
                sw="Kukuza utambuzi wa kitamaduni na uchumi wa ubunifu",
                en="Promote cultural expression and creative economy",
                kg="Tombola ndenge ya mimeseno ya culture ye ekonomi ya bokeli"
            ),
            icon="🎨",
            color="from-pink-500 to-rose-600",
            growth="+8%",
            backgroundImage="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920"
        )
    ]

def get_sample_companies():
    """Get sample companies with external links"""
    return [
        Company(
            name="Vodacom Congo",
            description=MultilingualText(
                fr="Leader des télécommunications en RDC",
                en="Leading telecommunications company in DRC",
                ln="Mokambi ya ba télécommunications na RDC"
            ),
            location="Kinshasa, RDC",
            sector="technology",
            size="200+",
            website=ExternalLink(
                name="Site officiel",
                url="https://vodacom.cd",
                description="Site web officiel de Vodacom Congo"
            ),
            contactEmail="careers@vodacom.cd"
        ),
        Company(
            name="Orange RDC",
            description=MultilingualText(
                fr="Opérateur de télécommunications et services numériques",
                en="Telecommunications operator and digital services",
                ln="Operateur ya ba télécommunications na ba services digitales"
            ),
            location="Kinshasa, RDC",
            sector="technology",
            size="200+",
            website=ExternalLink(
                name="Orange RDC",
                url="https://orange.cd",
                description="Services de télécommunications"
            ),
            contactEmail="emploi@orange.cd"
        ),
        Company(
            name="Rawbank",
            description=MultilingualText(
                fr="Première banque commerciale de la RDC",
                en="Leading commercial bank in DRC",
                ln="Banki ya liboso ya commerce na RDC"
            ),
            location="Kinshasa, RDC",
            sector="finance",
            size="200+",
            website=ExternalLink(
                name="Rawbank",
                url="https://rawbank.com",
                description="Services bancaires et financiers"
            ),
            contactEmail="recrutement@rawbank.com"
        ),
        Company(
            name="Université de Kinshasa",
            description=MultilingualText(
                fr="Principale université publique de la RDC",
                en="Main public university of DRC",
                ln="Université ya liboso ya leta na RDC"
            ),
            location="Kinshasa, RDC",
            sector="education",
            size="200+",
            website=ExternalLink(
                name="UNIKIN",
                url="https://unikin.ac.cd",
                description="Université de Kinshasa"
            ),
            contactEmail="rh@unikin.ac.cd"
        ),
        Company(
            name="Médecins Sans Frontières",
            description=MultilingualText(
                fr="Organisation médicale humanitaire internationale",
                en="International humanitarian medical organization",
                ln="Organisation ya monganga ya kimuntu ya mikili nyonso"
            ),
            location="Kinshasa, RDC",
            sector="healthcare",
            size="51-200",
            website=ExternalLink(
                name="MSF",
                url="https://msf.org",
                description="Médecins Sans Frontières"
            ),
            contactEmail="kinshasa-hr@msf.org"
        )
    ]

def get_sample_training():
    """Get sample training programs with external links"""
    return [
        Training(
            name=MultilingualText(
                fr="Développement Full Stack",
                en="Full Stack Development",
                ln="Développement ya Full Stack",
                sw="Maendeleo ya Full Stack"
            ),
            provider="FreeCodeCamp",
            description=MultilingualText(
                fr="Formation complète en développement web frontend et backend",
                en="Complete web development frontend and backend training",
                ln="Formation ya mobimba ya développement web frontend na backend"
            ),
            duration="6 mois",
            cost="Gratuit",
            level="Débutant",
            language="Français/Anglais",
            format="En ligne",
            externalLink=ExternalLink(
                name="FreeCodeCamp",
                url="https://freecodecamp.org",
                description="Plateforme d'apprentissage gratuite"
            ),
            skills=["JavaScript", "React", "Node.js", "MongoDB"],
            certificate=True
        ),
        Training(
            name=MultilingualText(
                fr="Médecine Tropicale",
                en="Tropical Medicine",
                ln="Monganga ya ba maladie ya tropique",
                sw="Dawa za Kitropiki"
            ),
            provider="Université de Kinshasa",
            description=MultilingualText(
                fr="Formation spécialisée en médecine tropicale et maladies endémiques",
                en="Specialized training in tropical medicine and endemic diseases",
                ln="Formation spécialisée ya monganga ya tropique na ba maladie ya mboka"
            ),
            duration="6 mois",
            cost="300$",
            level="Avancé",
            language="Français",
            format="Présentiel",
            externalLink=ExternalLink(
                name="Faculté de Médecine UNIKIN",
                url="https://unikin.ac.cd/faculte-medecine",
                description="Formation médicale spécialisée"
            ),
            skills=["Diagnostic tropical", "Épidémiologie", "Santé publique"],
            prerequisites=["Diplôme de médecine"],
            certificate=True
        ),
        Training(
            name=MultilingualText(
                fr="Gestion de Projet PMI",
                en="PMI Project Management",
                ln="Gestion ya ba projet PMI",
                sw="Usimamizi wa Mradi PMI"
            ),
            provider="Project Management Institute",
            description=MultilingualText(
                fr="Certification professionnelle en gestion de projet selon les standards PMI",
                en="Professional project management certification according to PMI standards",
                ln="Certification professionnelle ya gestion ya ba projet selon ba standards PMI"
            ),
            duration="4 mois",
            cost="500$",
            level="Intermédiaire",
            language="Français/Anglais",
            format="Hybride",
            externalLink=ExternalLink(
                name="PMI",
                url="https://pmi.org",
                description="Certification PMP"
            ),
            skills=["Planification", "Leadership", "Gestion des risques"],
            certificate=True
        ),
        Training(
            name=MultilingualText(
                fr="Enseignement Multilingue",
                en="Multilingual Teaching",
                ln="Boyekoli ya ba langue ebele",
                sw="Ufundishaji wa Lugha Nyingi"
            ),
            provider="UNESCO",
            description=MultilingualText(
                fr="Méthodes d'enseignement dans un environnement multilingue",
                en="Teaching methods in a multilingual environment",
                ln="Ba méthodes ya boyekoli na esika ya ba langue ebele"
            ),
            duration="3 mois",
            cost="Gratuit",
            level="Intermédiaire",
            language="Français",
            format="En ligne",
            externalLink=ExternalLink(
                name="UNESCO Formation",
                url="https://unesco.org/education/multilingual",
                description="Formation UNESCO en éducation multilingue"
            ),
            skills=["Pédagogie", "Linguistique", "Didactique"],
            certificate=True
        )
    ]

def get_sample_testimonials():
    """Get sample testimonials"""
    return [
        Testimonial(
            name="Marie Nkunku",
            position="Développeuse Full Stack",
            company="Vodacom Congo",
            quote=MultilingualText(
                fr="Travailler dans la tech en RDC signifie faire partie de la révolution numérique. Chaque application que nous construisons aide à connecter plus de Congolais aux opportunités.",
                en="Working in tech in DRC means being part of the digital revolution. Every app we build helps connect more Congolese to opportunities.",
                ln="Kosala na tech na RDC elingi koloba kozala na révolution digitale. Application nyonso oyo tosalaka esungaka kopesa ba Congolais mingi ba opportunités."
            ),
            jobId="software-developer",
            isVerified=True,
            isApproved=True
        ),
        Testimonial(
            name="Dr. Patience Mwamba",
            position="Pédiatre",
            company="Cliniques Universitaires de Kinshasa",
            quote=MultilingualText(
                fr="Être médecin en RDC signifie sauver des vies chaque jour et former la prochaine génération de professionnels de la santé.",
                en="Being a doctor in DRC means saving lives every day and training the next generation of health professionals.",
                ln="Kozala monganga na RDC elingi koloba kobikisa ba bomoi mokolo na mokolo mpe koteya ba monganga ya lobi."
            ),
            jobId="doctor",
            isVerified=True,
            isApproved=True
        ),
        Testimonial(
            name="Claude Mujinga",
            position="Directeur d'Agence",
            company="Rawbank",
            quote=MultilingualText(
                fr="Le secteur bancaire en RDC offre des opportunités exceptionnelles pour les jeunes professionnels ambitieux.",
                en="The banking sector in DRC offers exceptional opportunities for ambitious young professionals.",
                ln="Secteur ya banki na RDC epesaka ba opportunités ya kitoko mpo na ba professionnel ya bilenge oyo bazali na ba ambitions."
            ),
            jobId="banker",
            isVerified=True,
            isApproved=True
        )
    ]

def get_sample_jobs():
    """Get sample jobs with proper references"""
    return [
        Job(
            id="software-developer",
            title=MultilingualText(
                fr="Développeur Logiciel",
                en="Software Developer",
                ln="Mosali ya ba programme",
                sw="Mtengenezaji wa Programu"
            ),
            sector="Technologie",
            description=MultilingualText(
                fr="Développer des applications et systèmes pour numériser les entreprises et services gouvernementaux de la RDC",
                en="Develop applications and systems to digitize DRC businesses and government services",
                ln="Kosala ba application na ba système mpo na kopesa ba entreprise na ba service ya gouvernement ya RDC ba moyens digitales"
            ),
            education=["Licence en Informatique", "Formation en développement web", "Autodidacte avec portfolio"],
            salaryRange="800$ - 2,500$/mois",
            hiringRate="85%",
            growthProjection="+25% sur 5 ans",
            companies=["vodacom-congo", "orange-rdc"],  # Company IDs
            skills=["JavaScript", "Python", "React", "Développement mobile", "Gestion de base de données"],
            training=["full-stack-development"],  # Training IDs
            testimonials=["marie-nkunku-testimonial"],  # Testimonial IDs
            requirements=MultilingualText(
                fr="Licence en informatique ou formation équivalente. Expérience en développement web. Maîtrise des langages de programmation modernes.",
                en="Computer science degree or equivalent training. Web development experience. Proficiency in modern programming languages."
            ),
            benefits=MultilingualText(
                fr="Salaire compétitif, formation continue, opportunités d'évolution, travail sur des projets innovants",
                en="Competitive salary, continuous training, growth opportunities, work on innovative projects"
            ),
            workEnvironment=MultilingualText(
                fr="Environnement de travail moderne, équipes multiculturelles, télétravail possible",
                en="Modern work environment, multicultural teams, remote work possible"
            ),
            careerPath=MultilingualText(
                fr="Développeur Junior → Développeur Senior → Lead Developer → Architecte Technique → CTO",
                en="Junior Developer → Senior Developer → Lead Developer → Technical Architect → CTO"
            )
        ),
        Job(
            id="doctor",
            title=MultilingualText(
                fr="Médecin Généraliste",
                en="Medical Doctor",
                ln="Monganga ya mobimba",
                sw="Daktari wa Jumla"
            ),
            sector="Santé",
            description=MultilingualText(
                fr="Fournir des soins médicaux essentiels et renforcer les systèmes de santé à travers la RDC",
                en="Provide essential medical care and strengthen healthcare systems across the DRC",
                ln="Kopesa ba soins médicaux ya ntina na kolendisa ba système ya bokolongono na RDC mobimba"
            ),
            education=["Diplôme de Médecine (7 ans)", "Formation de Résidence (3-5 ans)", "Spécialisation Médicale"],
            salaryRange="1,200$ - 4,000$/mois",
            hiringRate="95%",
            growthProjection="+20% sur 5 ans",
            companies=["msf", "unikin"],
            skills=["Diagnostic clinique", "Médecine d'urgence", "Médecine tropicale", "Chirurgie", "Soins aux patients"],
            training=["tropical-medicine"],
            testimonials=["patience-mwamba-testimonial"],
            requirements=MultilingualText(
                fr="Diplôme de médecine reconnu. Licence de pratique médicale. Expérience clinique requise.",
                en="Recognized medical degree. Medical practice license. Clinical experience required."
            ),
            benefits=MultilingualText(
                fr="Impact social important, formation spécialisée, opportunités internationales, salaire attractif",
                en="High social impact, specialized training, international opportunities, attractive salary"
            ),
            workEnvironment=MultilingualText(
                fr="Hôpitaux modernes, équipes médicales expertes, équipement de pointe disponible",
                en="Modern hospitals, expert medical teams, state-of-the-art equipment available"
            ),
            careerPath=MultilingualText(
                fr="Médecin Généraliste → Spécialiste → Chef de Service → Directeur Médical",
                en="General Practitioner → Specialist → Department Head → Medical Director"
            )
        )
    ]