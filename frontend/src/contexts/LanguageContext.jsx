import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.sectors': 'Secteurs',
    'nav.careers': 'Carrières',
    'nav.about': 'À propos',
    'nav.login': 'Connexion',
    'nav.register': 'Commencer',
    'nav.dashboard': 'Tableau de bord',
    'nav.favorites': 'Mes Favoris',
    'nav.profile': 'Profil',
    'nav.admin': 'Gestion du site',
    'nav.logout': 'Déconnexion',
    
    // Homepage
    'home.title': 'Façonnez votre avenir professionnel en République Démocratique du Congo',
    'home.subtitle': 'KONGENGA est une plateforme qui vous accompagne dans l\'exploration de votre carrière et vous offre la possibilité de découvrir des opportunités d\'emploi dans des secteurs clés.',
    'home.cta.start': 'Commencer votre parcours',
    'home.cta.explore': 'Explorer les carrières',
    'home.stats.jobs': 'Opportunités de carrière',
    'home.stats.students': 'Étudiants accompagnés',
    'home.stats.companies': 'Entreprises partenaires',
    'home.stats.success': 'Histoires de réussite',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.all': 'Tous',
    'common.none': 'Aucun',
    
    // Jobs
    'jobs.title': 'Opportunités d\'emploi',
    'jobs.salary': 'Salaire',
    'jobs.hiring_rate': 'Taux d\'embauche',
    'jobs.skills': 'Compétences requises',
    'jobs.companies': 'Entreprises qui recrutent',
    'jobs.training': 'Formations recommandées',
    'jobs.testimonials': 'Témoignages',
    'jobs.education': 'Formation requise',
    'jobs.benefits': 'Avantages',
    'jobs.requirements': 'Exigences',
    
    // Sectors
    'sectors.technology': 'Technologie',
    'sectors.healthcare': 'Santé',
    'sectors.education': 'Éducation',
    'sectors.finance': 'Finance et Banque',
    'sectors.engineering': 'Ingénierie',
    'sectors.creative': 'Arts Créatifs'
  },
  
  ln: {
    // Navigation
    'nav.home': 'Ndako',
    'nav.sectors': 'Ba secteurs',
    'nav.careers': 'Misala',
    'nav.about': 'Na ntina ya biso',
    'nav.login': 'Kokota',
    'nav.register': 'Kobanda',
    'nav.dashboard': 'Tableau ya kotala',
    'nav.favorites': 'Ba préférés na ngai',
    'nav.profile': 'Profil na ngai',
    'nav.admin': 'Kotambwisa site',
    'nav.logout': 'Kobima',
    
    // Homepage
    'home.title': 'Sala avenir ya misala na yo na République Démocratique ya Congo',
    'home.subtitle': 'KONGENGA ezali plateforme oyo ekosalisa yo na koluka misala mpe kopesa yo ba opportunités ya mosala na ba secteurs ya ntina.',
    'home.cta.start': 'Kobanda mobembo na yo',
    'home.cta.explore': 'Koluka ba carrières',
    'home.stats.jobs': 'Ba opportunités ya misala',
    'home.stats.students': 'Ba étudiants oyo tosalisaki',
    'home.stats.companies': 'Ba entreprises partenaires',
    'home.stats.success': 'Ba histoire ya réussite',
    
    // Jobs
    'jobs.title': 'Ba opportunités ya mosala',
    'jobs.salary': 'Lifuta',
    'jobs.hiring_rate': 'Taux ya kozwa mosala',
    'jobs.skills': 'Ba compétences oyo esengeli',
    'jobs.companies': 'Ba entreprises oyo ezali kozwa bato',
    'jobs.training': 'Ba formation oyo totindi',
    'jobs.testimonials': 'Ba témoignages',
    'jobs.education': 'Boyekoli oyo esengeli',
    'jobs.benefits': 'Ba avantages',
    'jobs.requirements': 'Ba exigences',
    
    // Sectors
    'sectors.technology': 'Tekinoloji',
    'sectors.healthcare': 'Bokolongono',
    'sectors.education': 'Boyekoli',
    'sectors.finance': 'Mbongo na Banki',
    'sectors.engineering': 'Ingénierie',
    'sectors.creative': 'Ba Arts ya bokeli'
  },
  
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.sectors': 'Sekta',
    'nav.careers': 'Kazi',
    'nav.about': 'Kuhusu',
    'nav.login': 'Ingia',
    'nav.register': 'Anza',
    'nav.dashboard': 'Dashibodi',
    'nav.favorites': 'Vipendwa Vyangu',
    'nav.profile': 'Wasifu',
    'nav.admin': 'Usimamizi wa Tovuti',
    'nav.logout': 'Toka',
    
    // Homepage
    'home.title': 'Jenga mustakabali wako wa kazi katika Jamhuri ya Kidemokrasia ya Kongo',
    'home.subtitle': 'KONGENGA ni jukwaa ambalo litakusaidia katika kuchunguza kazi yako na kukupa fursa za kazi katika sekta muhimu.',
    'home.cta.start': 'Anza safari yako',
    'home.cta.explore': 'Chunguza kazi',
    'home.stats.jobs': 'Fursa za kazi',
    'home.stats.students': 'Wanafunzi walioongozwa',
    'home.stats.companies': 'Makampuni washirika',
    'home.stats.success': 'Hadithi za mafanikio',
    
    // Jobs
    'jobs.title': 'Fursa za ajira',
    'jobs.salary': 'Mshahara',
    'jobs.hiring_rate': 'Kiwango cha kuajiriwa',
    'jobs.skills': 'Ujuzi unaohitajika',
    'jobs.companies': 'Makampuni yanayoajiri',
    'jobs.training': 'Mafunzo yaliyopendekezwa',
    'jobs.testimonials': 'Ushahidi',
    'jobs.education': 'Elimu inayohitajika',
    'jobs.benefits': 'Faida',
    'jobs.requirements': 'Mahitaji',
    
    // Sectors
    'sectors.technology': 'Teknolojia',
    'sectors.healthcare': 'Afya',
    'sectors.education': 'Elimu',
    'sectors.finance': 'Fedha na Benki',
    'sectors.engineering': 'Uhandisi',
    'sectors.creative': 'Sanaa za Ubunifu'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.sectors': 'Sectors',
    'nav.careers': 'Careers',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.register': 'Get Started',
    'nav.dashboard': 'Dashboard',
    'nav.favorites': 'My Favorites',
    'nav.profile': 'Profile',
    'nav.admin': 'Site Management',
    'nav.logout': 'Logout',
    
    // Homepage
    'home.title': 'Shape Your Professional Future in the Democratic Republic of Congo',
    'home.subtitle': 'KONGENGA is a platform that helps you explore your career and discover job opportunities in key sectors.',
    'home.cta.start': 'Start Your Journey',
    'home.cta.explore': 'Explore Careers',
    'home.stats.jobs': 'Career Opportunities',
    'home.stats.students': 'Students Guided',
    'home.stats.companies': 'Partner Companies',
    'home.stats.success': 'Success Stories',
    
    // Jobs
    'jobs.title': 'Job Opportunities',
    'jobs.salary': 'Salary',
    'jobs.hiring_rate': 'Hiring Rate',
    'jobs.skills': 'Required Skills',
    'jobs.companies': 'Hiring Companies',
    'jobs.training': 'Recommended Training',
    'jobs.testimonials': 'Testimonials',
    'jobs.education': 'Required Education',
    'jobs.benefits': 'Benefits',
    'jobs.requirements': 'Requirements',
    
    // Sectors
    'sectors.technology': 'Technology',
    'sectors.healthcare': 'Healthcare',
    'sectors.education': 'Education',
    'sectors.finance': 'Finance & Banking',
    'sectors.engineering': 'Engineering',
    'sectors.creative': 'Creative Arts'
  },
  
  kg: {
    // Navigation
    'nav.home': 'Nzo',
    'nav.sectors': 'Ba secteurs',
    'nav.careers': 'Misala',
    'nav.about': 'Mu tadi a beto',
    'nav.login': 'Kwiza',
    'nav.register': 'Bandika',
    'nav.dashboard': 'Mesa ya kotala',
    'nav.favorites': 'Bima bina kele',
    'nav.profile': 'Lutumu lua ngai',
    'nav.admin': 'Tambwisa site',
    'nav.logout': 'Fioka',
    
    // Homepage
    'home.title': 'Vanga musango wa misala na Congo Democratique',
    'home.subtitle': 'KONGENGA ke plateforme yi kele salisa nge mu luka misala ye pesa ba opportunités ya mosala.',
    'home.cta.start': 'Bandika nzila ya nge',
    'home.cta.explore': 'Luka ba carrières',
    'home.stats.jobs': 'Ba opportunités ya misala',
    'home.stats.students': 'Ba étudiant ye tu salisisaka',
    'home.stats.companies': 'Ba entreprises partenaires',
    'home.stats.success': 'Ba histoire ya kimvuka',
    
    // Jobs
    'jobs.title': 'Ba opportunités ya mosala',
    'jobs.salary': 'Mbongo ya sanza',
    'jobs.hiring_rate': 'Ndenge ya tambula mosala',
    'jobs.skills': 'Ba makoki yi kele yenda',
    'jobs.companies': 'Ba entreprises yi kele tambula batu',
    'jobs.training': 'Ba formation ye tulomba',
    'jobs.testimonials': 'Ba témoignages',
    'jobs.education': 'Nlonguki yi kele yenda',
    'jobs.benefits': 'Ba avantages',
    'jobs.requirements': 'Ba exigences',
    
    // Sectors
    'sectors.technology': 'Teknolojia',
    'sectors.healthcare': 'Nlonguki',
    'sectors.education': 'Nlonguki',
    'sectors.finance': 'Mbongo ye Banki',
    'sectors.engineering': 'Ingénierie',
    'sectors.creative': 'Ba Arts ya bokeli'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('kongenga_language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = async (languageCode) => {
    if (translations[languageCode]) {
      setIsLoading(true);
      
      // Simulate loading time for smooth transition
      setTimeout(() => {
        setCurrentLanguage(languageCode);
        localStorage.setItem('kongenga_language', languageCode);
        setIsLoading(false);
      }, 300);
    }
  };

  const translate = (key, fallback = key) => {
    const translation = translations[currentLanguage]?.[key];
    return translation || translations['fr']?.[key] || fallback;
  };

  const getMultilingualText = (multilingualObj, fallback = '') => {
    if (!multilingualObj) return fallback;
    
    // If it's a string, return it directly
    if (typeof multilingualObj === 'string') return multilingualObj;
    
    // If it's an object with language keys
    return multilingualObj[currentLanguage] || 
           multilingualObj['fr'] || 
           multilingualObj['en'] || 
           Object.values(multilingualObj)[0] || 
           fallback;
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ln', name: 'Lingala', flag: '🇨🇩' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'kg', name: 'Kikongo', flag: '🇦🇴' }
  ];

  const value = {
    currentLanguage,
    changeLanguage,
    translate: translate,
    t: translate, // Short alias
    getMultilingualText,
    languages,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};