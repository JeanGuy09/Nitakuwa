<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

// Get all sectors
$sectors = getSectors();

// Get user language preference
$lang = $_SESSION['lang'] ?? 'fr';
require_once "../lang/{$lang}.php";
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $translations['sectors']; ?> - KONGENGA</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <main style="padding-top: 100px; min-height: 100vh; background: #111827;">
        
        <!-- Header Section -->
        <section style="background: linear-gradient(135deg, #111827, #1f2937, #000000); padding: 6rem 0; position: relative; overflow: hidden;">
            <!-- Animated Background -->
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(37, 99, 235, 0.3) 0%, transparent 50%);"></div>
            
            <!-- Floating Particles -->
            <div class="floating-particles">
                <?php for ($i = 0; $i < 20; $i++): ?>
                    <div class="particle" style="left: <?php echo rand(0, 100); ?>%; top: <?php echo rand(0, 100); ?>%; animation-delay: <?php echo rand(0, 3000); ?>ms;"></div>
                <?php endfor; ?>
            </div>
            
            <div class="container" style="position: relative; z-index: 10;">
                <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="color: white; font-size: 4rem; margin-bottom: 1rem; animation: slide-up 1s ease-out both;">
                        Secteurs d'activité
                    </h1>
                    <div class="gradient-line" style="width: 150px; animation: slide-up 1s ease-out 0.3s both;"></div>
                    <p style="color: #d1d5db; font-size: 1.3rem; line-height: 1.6; margin-top: 2rem; animation: slide-up 1s ease-out 0.5s both;">
                        Découvrez les secteurs économiques clés de la République Démocratique du Congo. 
                        Chaque secteur représente une opportunité unique de contribuer au développement du pays 
                        tout en construisant une carrière épanouissante.
                    </p>
                </div>
            </div>
        </section>

        <!-- Sectors Grid -->
        <section style="padding: 6rem 0; background: #111827; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(55, 65, 81, 0.3), transparent);"></div>
            
            <div class="container" style="position: relative;">
                <div class="sectors-grid">
                    <?php foreach ($sectors as $index => $sector): ?>
                        <div class="sector-card animate-on-scroll" style="animation-delay: <?php echo $index * 150; ?>ms;">
                            <div class="sector-icon" style="background: <?php echo $sector['gradient'] ?? 'linear-gradient(135deg, #3b82f6, #2563eb)'; ?>">
                                <?php echo $sector['icon'] ?? '🏢'; ?>
                            </div>
                            
                            <h3 class="sector-name">
                                <?php echo htmlspecialchars($sector['name_' . $lang] ?? $sector['name_fr']); ?>
                            </h3>
                            
                            <p class="sector-description">
                                <?php echo htmlspecialchars($sector['description_' . $lang] ?? $sector['description_fr']); ?>
                            </p>
                            
                            <div class="sector-stats">
                                <div class="sector-stat">
                                    <span class="stat-number"><?php echo $sector['job_count'] ?? 0; ?></span>
                                    <span class="stat-text">emplois disponibles</span>
                                </div>
                                <div class="growth-badge">
                                    <?php echo $sector['growth'] ?? 'Élevée'; ?> croissance
                                </div>
                            </div>

                            <!-- Key Benefits -->
                            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(55, 65, 81, 0.5); margin: 1.5rem 0;">
                                <h4 style="color: white; margin-bottom: 1rem; font-size: 1rem;">Pourquoi ce secteur ?</h4>
                                <ul style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; list-style: none; padding: 0;">
                                    <li style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                        <span style="width: 6px; height: 6px; background: #3b82f6; border-radius: 50%; margin-right: 0.5rem;"></span>
                                        Forte demande de talents qualifiés
                                    </li>
                                    <li style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                        <span style="width: 6px; height: 6px; background: #3b82f6; border-radius: 50%; margin-right: 0.5rem;"></span>
                                        Impact direct sur le développement
                                    </li>
                                    <li style="display: flex; align-items: center;">
                                        <span style="width: 6px; height: 6px; background: #3b82f6; border-radius: 50%; margin-right: 0.5rem;"></span>
                                        Opportunités de croissance rapide
                                    </li>
                                </ul>
                            </div>
                            
                            <a href="sector.php?id=<?php echo $sector['id']; ?>" class="btn btn-sector">
                                Explorer les opportunités
                                <span style="margin-left: 0.5rem; transition: transform 0.3s ease;">→</span>
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
                    <h2 class="cta-title">Besoin d'aide pour choisir ?</h2>
                    <p class="cta-subtitle">
                        Notre équipe peut vous aider à identifier le secteur qui correspond le mieux à vos compétences et aspirations.
                    </p>
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 2rem;">
                        <?php if (!isLoggedIn()): ?>
                            <a href="register.php" class="btn btn-cta">
                                Créer un compte
                            </a>
                        <?php endif; ?>
                        <a href="jobs.php" class="btn" style="background: transparent; border: 2px solid white; color: white;">
                            Voir tous les emplois
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    
    <script src="../assets/js/main.js"></script>
    <script>
        // Scroll Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Hover effects for sector cards
        document.querySelectorAll('.sector-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const arrow = this.querySelector('span');
                if (arrow) {
                    arrow.style.transform = 'translateX(5px)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const arrow = this.querySelector('span');
                if (arrow) {
                    arrow.style.transform = 'translateX(0)';
                }
            });
        });
    </script>
</body>
</html>