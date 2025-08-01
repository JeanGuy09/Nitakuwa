<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

// Get all jobs
$allJobs = getJobs();
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
    <title><?php echo $translations['jobs']; ?> - KONGENGA</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <main style="padding-top: 100px; min-height: 100vh; background: #111827;">
        
        <!-- Header Section -->
        <section style="background: linear-gradient(135deg, #111827, #1f2937); padding: 4rem 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
            <div class="container">
                <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="color: white; font-size: 3rem; margin-bottom: 1rem;">
                        Opportunités d'emploi
                    </h1>
                    <div class="gradient-line" style="width: 120px;"></div>
                    <p style="color: #d1d5db; font-size: 1.2rem; margin-top: 1.5rem; line-height: 1.6;">
                        Découvrez toutes les opportunités de carrière disponibles en République Démocratique du Congo
                    </p>
                </div>
            </div>
        </section>

        <!-- Filters Section -->
        <section style="background: #1f2937; padding: 2rem 0; border-bottom: 1px solid rgba(55, 65, 81, 0.5);">
            <div class="container">
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: center;">
                    <select id="sectorFilter" style="padding: 0.75rem 1rem; border: 1px solid #374151; border-radius: 8px; background: #374151; color: white; min-width: 200px;">
                        <option value="">Tous les secteurs</option>
                        <?php foreach ($sectors as $sector): ?>
                            <option value="<?php echo $sector['id']; ?>">
                                <?php echo htmlspecialchars($sector['name_' . $lang] ?? $sector['name_fr']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                    
                    <input 
                        type="text" 
                        id="searchInput" 
                        placeholder="Rechercher un emploi..."
                        style="padding: 0.75rem 1rem; border: 1px solid #374151; border-radius: 8px; background: #374151; color: white; min-width: 250px;"
                    >
                    
                    <button onclick="applyFilters()" class="btn btn-primary">
                        Filtrer
                    </button>
                </div>
            </div>
        </section>

        <!-- Jobs Grid -->
        <section style="padding: 4rem 0;">
            <div class="container">
                <div id="jobsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                    <?php foreach ($allJobs as $index => $job): ?>
                        <div class="job-card animate-on-scroll" data-sector="<?php echo $job['sector_id']; ?>" style="background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 2rem; border: 1px solid rgba(59, 130, 246, 0.1); transition: all 0.3s ease; animation-delay: <?php echo $index * 100; ?>ms;">
                            
                            <!-- Job Header -->
                            <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1.5rem;">
                                <div style="flex: 1;">
                                    <h3 style="color: white; font-size: 1.3rem; margin-bottom: 0.5rem; line-height: 1.3;">
                                        <?php echo htmlspecialchars($job['title_' . $lang] ?? $job['title_fr']); ?>
                                    </h3>
                                    <p style="color: #3b82f6; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                        <span style="font-size: 1.2rem;">🏢</span>
                                        <?php echo htmlspecialchars($job['sector_name']); ?>
                                    </p>
                                </div>
                                
                                <?php if (isLoggedIn()): ?>
                                    <button 
                                        onclick="toggleFavorite(<?php echo $job['id']; ?>, this)"
                                        style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: <?php echo isFavorite($_SESSION['user_id'] ?? 0, $job['id']) ? '#ef4444' : '#9ca3af'; ?>; transition: all 0.3s ease;"
                                        onmouseover="this.style.transform='scale(1.2)'"
                                        onmouseout="this.style.transform='scale(1)'"
                                    >
                                        <?php echo isFavorite($_SESSION['user_id'] ?? 0, $job['id']) ? '❤️' : '🤍'; ?>
                                    </button>
                                <?php endif; ?>
                            </div>

                            <!-- Job Description -->
                            <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 1.5rem;">
                                <?php echo substr(htmlspecialchars($job['description_' . $lang] ?? $job['description_fr']), 0, 150) . '...'; ?>
                            </p>

                            <!-- Job Details -->
                            <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
                                <!-- Salary Range -->
                                <?php if ($job['salary_min'] && $job['salary_max']): ?>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span style="color: #10b981; font-size: 1.1rem;">💰</span>
                                        <span style="color: #9ca3af; font-size: 0.9rem;">
                                            <?php echo number_format($job['salary_min']); ?> - <?php echo number_format($job['salary_max']); ?> USD/mois
                                        </span>
                                    </div>
                                <?php endif; ?>

                                <!-- Studies Required -->
                                <?php if ($job['required_studies_' . $lang] ?? $job['required_studies_fr']): ?>
                                    <div style="display: flex; align-items: start; gap: 0.5rem;">
                                        <span style="color: #f59e0b; font-size: 1.1rem; margin-top: 0.1rem;">🎓</span>
                                        <span style="color: #9ca3af; font-size: 0.9rem; line-height: 1.4;">
                                            <?php echo substr(htmlspecialchars($job['required_studies_' . $lang] ?? $job['required_studies_fr']), 0, 100) . '...'; ?>
                                        </span>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <!-- Action Button -->
                            <a href="job.php?id=<?php echo $job['id']; ?>" class="btn btn-sector" style="width: 100%; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                Voir les détails
                                <span style="transition: transform 0.3s ease;">→</span>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- No Results Message -->
                <div id="noResults" style="display: none; text-align: center; padding: 4rem; color: #9ca3af;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="color: white; margin-bottom: 1rem;">Aucun emploi trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                </div>
            </div>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    
    <script src="../assets/js/main.js"></script>
    <script>
        // Filter and Search functionality
        function applyFilters() {
            const sectorFilter = document.getElementById('sectorFilter').value;
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const jobCards = document.querySelectorAll('.job-card');
            const noResults = document.getElementById('noResults');
            let visibleCount = 0;

            jobCards.forEach(card => {
                const sectorId = card.getAttribute('data-sector');
                const jobTitle = card.querySelector('h3').textContent.toLowerCase();
                const jobDescription = card.querySelector('p').textContent.toLowerCase();
                
                const matchesSector = !sectorFilter || sectorId === sectorFilter;
                const matchesSearch = !searchTerm || 
                    jobTitle.includes(searchTerm) || 
                    jobDescription.includes(searchTerm);

                if (matchesSector && matchesSearch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        // Real-time search
        document.getElementById('searchInput').addEventListener('input', applyFilters);
        document.getElementById('sectorFilter').addEventListener('change', applyFilters);

        // Hover effects
        document.querySelectorAll('.job-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
                this.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                
                const arrow = this.querySelector('span[style*="transition"]');
                if (arrow) arrow.style.transform = 'translateX(5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.borderColor = 'rgba(59, 130, 246, 0.1)';
                
                const arrow = this.querySelector('span[style*="transition"]');
                if (arrow) arrow.style.transform = 'translateX(0)';
            });
        });
    </script>
</body>
</html>