// Mock data for DRC Career Platform

export const sectors = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Drive digital transformation and innovation in the DRC',
    icon: '💻',
    jobCount: 45,
    growth: '+15%',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Improve health outcomes and medical infrastructure',
    icon: '🏥',
    jobCount: 38,
    growth: '+22%',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Build educational capacity and human capital',
    icon: '📚',
    jobCount: 52,
    growth: '+18%',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    description: 'Strengthen financial systems and economic growth',
    icon: '💰',
    jobCount: 29,
    growth: '+12%',
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Build infrastructure and industrial capacity',
    icon: '⚙️',
    jobCount: 41,
    growth: '+20%',
    color: 'from-gray-500 to-slate-600'
  },
  {
    id: 'creative',
    name: 'Creative Arts',
    description: 'Promote cultural expression and creative economy',
    icon: '🎨',
    jobCount: 24,
    growth: '+8%',
    color: 'from-pink-500 to-rose-600'
  }
];

export const jobs = {
  technology: [
    {
      id: 'software-developer',
      title: 'Software Developer',
      sector: 'Technology',
      description: 'Develop applications and systems to digitize DRC businesses and government services',
      education: ['Bachelor in Computer Science', 'Software Engineering Bootcamp', 'Self-taught with portfolio'],
      salaryRange: '$800 - $2,500/month',
      hiringRate: '85%',
      growthProjection: '+25% over 5 years',
      companies: ['Vodacom Congo', 'Orange RDC', 'Airtel Congo', 'BCDC Digital', 'Startups Hub Kinshasa'],
      skills: ['JavaScript', 'Python', 'React', 'Mobile Development', 'Database Management'],
      training: [
        { name: 'Full Stack Development', provider: 'FreeCodeCamp', duration: '6 months', cost: 'Free' },
        { name: 'Mobile App Development', provider: 'Udacity', duration: '4 months', cost: '$400' },
        { name: 'Python Programming', provider: 'Coursera', duration: '3 months', cost: '$150' }
      ],
      testimonials: [
        {
          name: 'Marie Nkunku',
          position: 'Software Developer at Vodacom Congo',
          image: '/api/placeholder/60/60',
          quote: 'Working in tech in DRC means being part of the digital revolution. Every app we build helps connect more Congolese to opportunities.'
        },
        {
          name: 'Jean-Paul Mukendi',
          position: 'Mobile Developer at Orange RDC',
          image: '/api/placeholder/60/60',
          quote: 'The demand for tech talent is huge here. If you have the skills, companies will compete to hire you.'
        }
      ]
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      sector: 'Technology',
      description: 'Analyze data to drive business decisions and government policy in the DRC',
      education: ['Bachelor in Statistics/Math', 'Data Science Certification', 'Economics with Data Analytics'],
      salaryRange: '$600 - $2,000/month',
      hiringRate: '78%',
      growthProjection: '+30% over 5 years',
      companies: ['World Bank DRC', 'UNDP Congo', 'Mining Companies', 'Banks', 'Government Agencies'],
      skills: ['Python/R', 'Excel', 'SQL', 'Tableau', 'Statistical Analysis'],
      training: [
        { name: 'Data Analysis with Python', provider: 'Coursera', duration: '4 months', cost: '$200' },
        { name: 'Business Intelligence', provider: 'edX', duration: '3 months', cost: '$100' },
        { name: 'Statistics for Data Science', provider: 'Khan Academy', duration: '2 months', cost: 'Free' }
      ],
      testimonials: [
        {
          name: 'Françoise Kabila',
          position: 'Data Analyst at World Bank DRC',
          image: '/api/placeholder/60/60',
          quote: 'Data analysis helps us understand poverty patterns and design better programs for Congolese communities.'
        }
      ]
    }
  ],
  healthcare: [
    {
      id: 'doctor',
      title: 'Medical Doctor',
      sector: 'Healthcare',
      description: 'Provide essential medical care and strengthen healthcare systems across the DRC',
      education: ['Medical Degree (7 years)', 'Residency Training (3-5 years)', 'Medical Specialization'],
      salaryRange: '$1,200 - $4,000/month',
      hiringRate: '95%',
      growthProjection: '+20% over 5 years',
      companies: ['Cliniques Universitaires de Kinshasa', 'Hôpital Général de Référence', 'MSF Belgium', 'WHO DRC', 'Private Clinics'],
      skills: ['Clinical Diagnosis', 'Emergency Medicine', 'Tropical Medicine', 'Surgery', 'Patient Care'],
      training: [
        { name: 'Tropical Medicine Course', provider: 'University of Kinshasa', duration: '6 months', cost: '$300' },
        { name: 'Emergency Response Training', provider: 'Red Cross', duration: '1 month', cost: '$100' },
        { name: 'Medical French/English', provider: 'Alliance Française', duration: '3 months', cost: '$150' }
      ],
      testimonials: [
        {
          name: 'Dr. Patience Mwamba',
          position: 'Pediatrician at CUK',
          image: '/api/placeholder/60/60',
          quote: 'Being a doctor in DRC means saving lives every day and training the next generation of medical professionals.'
        }
      ]
    },
    {
      id: 'nurse',
      title: 'Registered Nurse',
      sector: 'Healthcare',
      description: 'Provide frontline healthcare services and support medical teams',
      education: ['Nursing Diploma (3 years)', 'Bachelor in Nursing', 'Nursing Certification'],
      salaryRange: '$400 - $1,200/month',
      hiringRate: '92%',
      growthProjection: '+25% over 5 years',
      companies: ['Public Hospitals', 'Private Clinics', 'NGO Health Programs', 'Rural Health Centers', 'International Organizations'],
      skills: ['Patient Care', 'Medical Procedures', 'Health Education', 'Emergency Response', 'Community Health'],
      training: [
        { name: 'Advanced Nursing Care', provider: 'Institut Supérieur des Techniques Médicales', duration: '6 months', cost: '$200' },
        { name: 'Maternal Health', provider: 'UNFPA', duration: '2 months', cost: 'Free' },
        { name: 'HIV/AIDS Care', provider: 'WHO', duration: '1 month', cost: 'Free' }
      ],
      testimonials: [
        {
          name: 'Grace Tshala',
          position: 'Head Nurse at Rural Health Center',
          image: '/api/placeholder/60/60',
          quote: 'Nursing in DRC means being the backbone of healthcare. We often serve communities with no other medical access.'
        }
      ]
    }
  ],
  education: [
    {
      id: 'teacher',
      title: 'Primary School Teacher',
      sector: 'Education',
      description: 'Educate the next generation and build literacy across the DRC',
      education: ['Bachelor in Education', 'Teaching Certificate', 'Subject Specialization'],
      salaryRange: '$300 - $800/month',
      hiringRate: '88%',
      growthProjection: '+15% over 5 years',
      companies: ['Public Schools', 'Private Schools', 'NGO Education Programs', 'UNESCO Projects', 'Religious Schools'],
      skills: ['Curriculum Development', 'Classroom Management', 'Local Languages', 'Educational Technology', 'Child Psychology'],
      training: [
        { name: 'Modern Teaching Methods', provider: 'University of Kinshasa', duration: '4 months', cost: '$150' },
        { name: 'Educational Technology', provider: 'British Council', duration: '2 months', cost: '$100' },
        { name: 'Multilingual Education', provider: 'UNESCO', duration: '3 months', cost: 'Free' }
      ],
      testimonials: [
        {
          name: 'Professor Mbuyi Kalala',
          position: 'Primary School Director',
          image: '/api/placeholder/60/60',
          quote: 'Teaching in DRC means shaping minds that will transform our nation. Every student could be the future leader we need.'
        }
      ]
    }
  ],
  finance: [
    {
      id: 'banker',
      title: 'Commercial Banker',
      sector: 'Finance & Banking',
      description: 'Manage financial services and support economic development',
      education: ['Bachelor in Finance/Economics', 'Banking Certification', 'Business Administration'],
      salaryRange: '$800 - $2,500/month',
      hiringRate: '75%',
      growthProjection: '+18% over 5 years',
      companies: ['Rawbank', 'BCDC', 'Trust Merchant Bank', 'FBN Bank DRC', 'Equity Bank'],
      skills: ['Financial Analysis', 'Risk Management', 'Customer Service', 'Loan Assessment', 'Banking Software'],
      training: [
        { name: 'Commercial Banking', provider: 'African Development Bank', duration: '3 months', cost: '$250' },
        { name: 'Financial Risk Management', provider: 'CFA Institute', duration: '4 months', cost: '$400' },
        { name: 'Digital Banking', provider: 'Fintech Academy', duration: '2 months', cost: '$150' }
      ],
      testimonials: [
        {
          name: 'Claude Mujinga',
          position: 'Branch Manager at Rawbank',
          image: '/api/placeholder/60/60',
          quote: 'Banking in DRC means helping people access financial services and supporting SME growth across the country.'
        }
      ]
    }
  ],
  engineering: [
    {
      id: 'civil-engineer',
      title: 'Civil Engineer',
      sector: 'Engineering',
      description: 'Design and build infrastructure to develop the DRC',
      education: ['Bachelor in Civil Engineering', 'Engineering License', 'Project Management Certification'],
      salaryRange: '$1,000 - $3,500/month',
      hiringRate: '82%',
      growthProjection: '+22% over 5 years',
      companies: ['China Communications Construction', 'BCDC Construction', 'Government Infrastructure Projects', 'Mining Companies', 'International Contractors'],
      skills: ['Structural Design', 'Project Management', 'AutoCAD', 'Construction Management', 'Environmental Impact'],
      training: [
        { name: 'Infrastructure Design', provider: 'University of Lubumbashi', duration: '6 months', cost: '$300' },
        { name: 'Project Management Professional', provider: 'PMI', duration: '4 months', cost: '$500' },
        { name: 'Sustainable Construction', provider: 'Green Building Council', duration: '2 months', cost: '$200' }
      ],
      testimonials: [
        {
          name: 'Engineer Paul Kasongo',
          position: 'Infrastructure Project Manager',
          image: '/api/placeholder/60/60',
          quote: 'Every road, bridge, and building we design brings DRC closer to its development goals. Engineering here means nation-building.'
        }
      ]
    }
  ],
  creative: [
    {
      id: 'graphic-designer',
      title: 'Graphic Designer',
      sector: 'Creative Arts',
      description: 'Create visual content and promote Congolese culture through design',
      education: ['Bachelor in Graphic Design', 'Art School Certificate', 'Self-taught with Portfolio'],
      salaryRange: '$400 - $1,500/month',
      hiringRate: '70%',
      growthProjection: '+12% over 5 years',
      companies: ['Advertising Agencies', 'Media Companies', 'NGOs', 'Government Communications', 'Freelance Work'],
      skills: ['Adobe Creative Suite', 'Branding', 'Web Design', 'Print Design', 'Cultural Sensitivity'],
      training: [
        { name: 'Digital Design Mastery', provider: 'Adobe Certified', duration: '4 months', cost: '$300' },
        { name: 'Brand Identity Design', provider: 'Skillshare', duration: '2 months', cost: '$100' },
        { name: 'African Visual Culture', provider: 'Academy of Fine Arts Kinshasa', duration: '3 months', cost: '$150' }
      ],
      testimonials: [
        {
          name: 'Sylvie Mukeba',
          position: 'Creative Director at Publicis Congo',
          image: '/api/placeholder/60/60',
          quote: 'Design in DRC means telling authentic Congolese stories while building brands that compete globally.'
        }
      ]
    }
  ]
};

export const users = {
  students: [
    {
      id: 'student1',
      name: 'Gloire Mwamba',
      email: 'gloire.mwamba@gmail.com',
      university: 'University of Kinshasa',
      year: 'Final Year',
      field: 'Computer Science',
      favoriteJobs: ['software-developer', 'data-analyst'],
      progress: {
        profileComplete: 80,
        jobsExplored: 12,
        trainingsStarted: 3,
        skillsAssessed: 5
      }
    }
  ],
  managers: [
    {
      id: 'manager1',
      name: 'Admin Manager',
      email: 'admin@careerplatform.cd',
      role: 'site_manager',
      permissions: ['manage_jobs', 'manage_users', 'view_analytics']
    }
  ]
};

export const statistics = {
  totalJobs: 229,
  totalStudents: 1547,
  totalCompanies: 89,
  successStories: 234,
  sectorsGrowth: {
    technology: '+25%',
    healthcare: '+22%',
    education: '+15%',
    finance: '+18%',
    engineering: '+22%',
    creative: '+12%'
  }
};