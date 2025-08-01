# KONGENGA - Career Platform for DRC

## 🌟 Overview
KONGENGA is a career platform built specifically for the Democratic Republic of Congo, designed to help students and professionals discover job opportunities in key economic sectors.

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Styling**: Pure CSS with animations and responsive design

## ✨ Features

### 🎯 Core Features
- **Multi-sector Career Exploration**: Technology, Health, Education, Agriculture, Mining, Finance
- **Multilingual Support**: French and English (extendable to Lingala, Swahili, Kikongo)
- **User Authentication**: Student and Admin roles
- **Job Management**: Browse, search, and filter opportunities
- **Favorites System**: Save interesting job opportunities
- **Interactive Dashboard**: Personal progress tracking
- **Gradient Blue Design**: Modern UI with animated elements

### 🎨 Design Features
- **Gradient Blue Slide Bars**: Interactive sliders with blue gradients
- **Animated Background**: Floating elements and grid animations
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Modern dark interface with blue accents
- **Micro-animations**: Smooth transitions and hover effects

## 🚀 Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)

### Setup Steps

1. **Clone/Download the project**
   ```bash
   # Place the kongenga_php folder in your web server directory
   # Example: /var/www/html/kongenga_php or C:\xampp\htdocs\kongenga_php
   ```

2. **Configure Database**
   ```bash
   # Update database credentials in config/database.php if needed
   # Default settings:
   # Host: localhost
   # User: root
   # Password: (empty)
   # Database: kongenga_db
   ```

3. **Initialize Database**
   ```bash
   # Run the initialization script
   php setup/init_database.php
   ```

4. **Start Web Server**
   ```bash
   # For XAMPP/WAMP: Start Apache and MySQL
   # For development server:
   php -S localhost:8000 -t .
   ```

5. **Access the Website**
   ```
   http://localhost/kongenga_php/
   # or
   http://localhost:8000/
   ```

## 👥 Demo Accounts

### Administrator
- **Email**: admin@kongenga.cd
- **Password**: admin123
- **Role**: Site Manager (full access)

### Student
- **Email**: student@kongenga.cd
- **Password**: student123
- **Role**: Student (standard user)

## 📁 Project Structure

```
kongenga_php/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   └── animations.css     # Gradient blue animations
│   └── js/
│       └── main.js           # JavaScript functionality
├── config/
│   └── database.php          # Database configuration
├── database/
│   └── sample_data.sql       # Sample data for DRC sectors
├── includes/
│   ├── functions.php         # Core PHP functions
│   ├── header.php           # Site header
│   ├── footer.php           # Site footer
│   ├── set_language.php     # Language switcher
│   └── toggle_favorite.php  # Favorites functionality
├── lang/
│   ├── fr.php               # French translations
│   └── en.php               # English translations
├── pages/
│   ├── login.php            # User login
│   ├── register.php         # User registration
│   ├── dashboard.php        # User dashboard
│   ├── sectors.php          # Sectors listing
│   ├── jobs.php             # Jobs listing
│   └── logout.php           # Logout handler
├── setup/
│   └── init_database.php    # Database initialization
├── index.php                # Homepage
└── README.md               # This file
```

## 🎨 Gradient Blue Features

### Interactive Sliders
- **Career Interest Sliders**: Gradient blue progress tracking
- **Skill Level Indicators**: Animated progress bars
- **Responsive Touch**: Mobile-friendly interactions

### Visual Elements
- **Slide Bars**: Gradient blue decorative elements
- **Progress Indicators**: Animated completion tracking
- **Hover Effects**: Blue gradient hover states
- **Loading Animations**: Smooth blue gradient transitions

## 🌍 Multilingual Support

### Currently Supported
- **French (FR)**: Primary language
- **English (EN)**: Secondary language

### Planned Languages
- **Lingala (LN)**: Local Congolese language
- **Swahili (SW)**: Regional language
- **Kikongo (KG)**: Local Congolese language

## 📊 Sectors Covered

1. **Technology (Technologie)**
   - Software Development
   - Data Analysis
   - DevOps Engineering

2. **Health (Santé)**
   - General Medicine
   - Specialized Nursing

3. **Education (Éducation)**
   - University Teaching
   - Educational Counseling

4. **Agriculture**
   - Modern farming techniques
   - Agrotechnology

5. **Mining & Resources**
   - Sustainable extraction
   - Geological services

6. **Finance & Economics**
   - Banking services
   - Microfinance

## 🔧 Customization

### Adding New Sectors
1. Insert into `sectors` table
2. Add jobs to `jobs` table
3. Update translations in language files

### Styling Modifications
- **Main styles**: `assets/css/style.css`
- **Animations**: `assets/css/animations.css`
- **Gradient colors**: Modify CSS custom properties

### Language Extension
1. Create new language file in `lang/` directory
2. Add language option to header dropdown
3. Update `set_language.php` validation

## 🚀 Deployment

### Production Considerations
1. **Security**: Update database credentials
2. **SSL**: Enable HTTPS for production
3. **Optimization**: Minify CSS/JS files
4. **Caching**: Implement PHP/MySQL caching
5. **Backup**: Regular database backups

## 📱 Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing
This is a career platform for the Democratic Republic of Congo. Contributions should focus on:
- DRC-specific job sectors
- Local language translations
- Cultural adaptations
- Performance improvements

## 📞 Contact
For questions about KONGENGA:
- **Email**: contact@kongenga.cd
- **Platform**: Democratic Republic of Congo Career Platform

## 📄 License
Built for educational and career development purposes in the Democratic Republic of Congo.

---

**KONGENGA** - *Shaping professional futures in the Democratic Republic of Congo* 🇨🇩