<?php
session_start();
require_once 'config/database.php';
require_once 'includes/functions.php';

// Get user language preference
$lang = $_SESSION['lang'] ?? 'fr';
require_once "lang/{$lang}.php";
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $translations['site_title']; ?> - KONGENGA</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-background">
            <div class="gradient-overlay"></div>
            <div class="animated-grid"></div>
            <div class="floating-elements">
                <div class="float-element float-1"></div>
                <div class="float-element float-2"></div>
            </div>
        </div>
        
        <div class="container">
            <div class="hero-content">
                <div class="hero-logo">
                    <h1 class="logo-text">KONGENGA</h1>
                    <div class="logo-subtitle">
                        <span class="gradient-text"><?php echo $translations['careers']; ?> • RDC</span>
                    </div>
                </div>
                
                <div class="hero-grid">
                    <div class="hero-left">
                        <h2 class="hero-title"><?php echo $translations['hero_title']; ?></h2>
                        <p class="hero-subtitle"><?php echo $translations['hero_subtitle']; ?></p>
                        
                        <div class="hero-buttons">
                            <?php if (isset($_SESSION['user_id'])): ?>
                                <a href="pages/dashboard.php" class="btn btn-primary gradient-btn">
                                    <?php echo $translations['dashboard']; ?>
                                </a>
                            <?php else: ?>
                                <a href="pages/register.php" class="btn btn-primary gradient-btn">
                                    <?php echo $translations['start_journey']; ?>
                                </a>
                                <a href="pages/sectors.php" class="btn btn-outline">
                                    <?php echo $translations['explore_sectors']; ?>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <div class="hero-right">
                        <div class="hero-illustration">
                            <div class="illustration-card">
                                <div class="illustration-icon">💻</div>
                                <p class="illustration-title"><?php echo $translations['technology']; ?></p>
                                <p class="illustration-subtitle">Construisez l'avenir</p>
                            </div>
                            <div class="floating-badges">
                                <div class="badge badge-yellow">⭐</div>
                                <div class="badge badge-blue">🎯</div>
                                <div class="badge badge-green">🚀</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="scroll-indicator">
            <div class="scroll-line">
                <div class="scroll-dot"></div>
            </div>
        </div>
    </section>
    
    <!-- Statistics Section -->
    <section class="stats-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">KONGENGA en chiffres</h2>
                <div class="gradient-line"></div>
            </div>
            
            <div class="stats-grid">
                <?php
                $stats = getStatistics();
                $statItems = [
                    ['value' => $stats['jobs'], 'label' => $translations['jobs_count'], 'color' => 'blue', 'icon' => '💼'],
                    ['value' => $stats['students'], 'label' => $translations['students_count'], 'color' => 'green', 'icon' => '🎓'],
                    ['value' => $stats['companies'], 'label' => $translations['companies_count'], 'color' => 'cyan', 'icon' => '🏢'],
                    ['value' => $stats['success'], 'label' => $translations['success_stories'], 'color' => 'orange', 'icon' => '🏆']
                ];
                
                foreach ($statItems as $index => $stat):
                ?>
                <div class="stat-item" style="animation-delay: <?php echo $index * 200; ?>ms">
                    <div class="stat-value gradient-text-<?php echo $stat['color']; ?>">
                        <?php echo $stat['value']; ?>+
                    </div>
                    <div class="stat-icon"><?php echo $stat['icon']; ?></div>
                    <div class="stat-label"><?php echo $stat['label']; ?></div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    
    <!-- Sectors Preview -->
    <section class="sectors-preview">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Explorez les secteurs à fort impact</h2>
                <p class="section-subtitle">
                    Choisissez parmi les secteurs qui stimulent la croissance économique et le développement en RDC
                </p>
                <div class="gradient-line"></div>
            </div>
            
            <div class="sectors-grid">
                <?php
                $sectors = getSectors(6); // Get first 6 sectors
                foreach ($sectors as $index => $sector):
                ?>
                <div class="sector-card" style="animation-delay: <?php echo $index * 150; ?>ms">
                    <div class="sector-icon" style="background: <?php echo $sector['gradient']; ?>">
                        <?php echo $sector['icon']; ?>
                    </div>
                    <h3 class="sector-name"><?php echo $sector['name_' . $lang]; ?></h3>
                    <p class="sector-description"><?php echo $sector['description_' . $lang]; ?></p>
                    
                    <div class="sector-stats">
                        <div class="sector-stat">
                            <span class="stat-number"><?php echo $sector['job_count']; ?></span>
                            <span class="stat-text">emplois</span>
                        </div>
                        <div class="growth-badge"><?php echo $sector['growth']; ?> croissance</div>
                    </div>
                    
                    <a href="pages/sector.php?id=<?php echo $sector['id']; ?>" class="btn btn-sector">
                        Explorer <?php echo $sector['name_' . $lang]; ?>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2 class="cta-title">Prêt à commencer votre parcours professionnel ?</h2>
                <p class="cta-subtitle">
                    Rejoignez des milliers d'étudiants congolais qui construisent l'avenir de notre nation
                </p>
                <?php if (!isset($_SESSION['user_id'])): ?>
                <a href="pages/register.php" class="btn btn-cta">
                    Créer votre compte gratuit
                </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
    
    <?php include 'includes/footer.php'; ?>
    
    <!-- Chat Widget -->
    <div class="chat-widget">
        <div class="chat-button" onclick="toggleChat()">
            <span>💬</span>
        </div>
    </div>
    
    <script src="assets/js/main.js"></script>
</body>
</html>