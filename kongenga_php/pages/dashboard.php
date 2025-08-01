<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

// Check if user is logged in
if (!isLoggedIn()) {
    header('Location: login.php');
    exit;
}

// Get user data
$userId = $_SESSION['user_id'];
$userName = $_SESSION['user_name'];
$userEmail = $_SESSION['user_email'];

// Get user's favorite jobs
$favoriteJobs = getUserFavorites($userId);

// Get user language preference
$lang = $_SESSION['lang'] ?? 'fr';
require_once "../lang/{$lang}.php";
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $translations['dashboard']; ?> - KONGENGA</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <main style="padding-top: 100px; min-height: 100vh; background: #111827;">
        <div class="container">
            <!-- Welcome Header -->
            <div style="margin: 2rem 0; text-align: center;">
                <h1 style="color: white; font-size: 2.5rem; margin-bottom: 0.5rem;">
                    Bienvenue, <?php echo htmlspecialchars($userName); ?> !
                </h1>
                <div class="gradient-line" style="width: 120px;"></div>
                <p style="color: #9ca3af; margin-top: 1rem; font-size: 1.1rem;">
                    Votre tableau de bord personnel KONGENGA
                </p>
            </div>

            <div style="display: grid; gap: 2rem; margin-bottom: 3rem;">
                
                <!-- Profile Summary Card -->
                <div style="background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 2rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                    <div style="display: grid; grid-template-columns: auto 1fr auto; gap: 2rem; align-items: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                            <?php echo strtoupper(substr($userName, 0, 1)); ?>
                        </div>
                        
                        <div>
                            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">
                                <?php echo htmlspecialchars($userName); ?>
                            </h3>
                            <p style="color: #9ca3af; margin-bottom: 0.5rem;">
                                📧 <?php echo htmlspecialchars($userEmail); ?>
                            </p>
                            <p style="color: #3b82f6; font-weight: 600;">
                                👨‍🎓 Étudiant KONGENGA
                            </p>
                        </div>
                        
                        <a href="profile.php" class="btn btn-outline">
                            Modifier le profil
                        </a>
                    </div>
                </div>

                <!-- Career Progress Section -->
                <div style="background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 2rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                    <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        📊 Votre progression de carrière
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <!-- Progress Bars -->
                        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <!-- Profile Completion -->
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="color: #d1d5db; font-weight: 500;">Profil complété</span>
                                    <span style="color: #3b82f6; font-weight: bold;">75%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 75%;"></div>
                                </div>
                            </div>

                            <!-- Job Exploration -->
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="color: #d1d5db; font-weight: 500;">Emplois explorés</span>
                                    <span style="color: #3b82f6; font-weight: bold;">12</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 60%;"></div>
                                </div>
                            </div>

                            <!-- Career Interest Slider -->
                            <div class="slide-bar-gradient">
                                <div class="slide-bar-label">
                                    <span>Niveau d'intérêt pour la technologie</span>
                                    <span class="slide-bar-value" id="tech-value">75%</span>
                                </div>
                                <div class="slide-bar-wrapper" onclick="updateSlider(event, 'tech')">
                                    <div class="slide-bar-fill" id="tech-fill" style="width: 75%;"></div>
                                    <div class="slide-bar-thumb" id="tech-thumb" style="left: 75%;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Stats Cards -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 1.5rem; text-align: center;">
                                <div style="font-size: 2rem; color: #3b82f6; font-weight: bold; margin-bottom: 0.5rem;">
                                    <?php echo count($favoriteJobs); ?>
                                </div>
                                <div style="color: #9ca3af; font-size: 0.9rem;">Emplois favoris</div>
                            </div>

                            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 1.5rem; text-align: center;">
                                <div style="font-size: 2rem; color: #10b981; font-weight: bold; margin-bottom: 0.5rem;">3</div>
                                <div style="color: #9ca3af; font-size: 0.9rem;">Formations démarrées</div>
                            </div>

                            <div style="background: rgba(245, 101, 101, 0.1); border: 1px solid rgba(245, 101, 101, 0.2); border-radius: 12px; padding: 1.5rem; text-align: center;">
                                <div style="font-size: 2rem; color: #f56565; font-weight: bold; margin-bottom: 0.5rem;">5</div>
                                <div style="color: #9ca3af; font-size: 0.9rem;">Secteurs explorés</div>
                            </div>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; padding: 1.5rem; text-align: center;">
                                <div style="font-size: 2rem; color: #fbbf24; font-weight: bold; margin-bottom: 0.5rem;">15</div>
                                <div style="color: #9ca3af; font-size: 0.9rem;">Jours d'activité</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Favorite Jobs -->
                <div style="background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 2rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="color: white; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            ❤️ Mes emplois favoris
                        </h3>
                        <a href="favorites.php" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                            Voir tous →
                        </a>
                    </div>

                    <?php if (empty($favoriteJobs)): ?>
                        <div style="text-align: center; padding: 3rem; color: #9ca3af;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">💼</div>
                            <p style="font-size: 1.1rem; margin-bottom: 1rem;">Aucun emploi favori pour le moment</p>
                            <p style="margin-bottom: 1.5rem;">Explorez nos secteurs et sauvegardez les emplois qui vous intéressent</p>
                            <a href="sectors.php" class="btn btn-primary">
                                Explorer les secteurs
                            </a>
                        </div>
                    <?php else: ?>
                        <div style="display: grid; gap: 1rem;">
                            <?php foreach (array_slice($favoriteJobs, 0, 3) as $job): ?>
                                <div style="background: rgba(0, 0, 0, 0.2); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(59, 130, 246, 0.1); transition: all 0.3s ease;" onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.3)'" onmouseout="this.style.borderColor='rgba(59, 130, 246, 0.1)'">
                                    <div style="display: flex; justify-content: space-between; align-items: start;">
                                        <div style="flex: 1;">
                                            <h4 style="color: white; font-size: 1.2rem; margin-bottom: 0.5rem;">
                                                <?php echo htmlspecialchars($job['title_' . $lang] ?? $job['title_fr']); ?>
                                            </h4>
                                            <p style="color: #9ca3af; margin-bottom: 0.5rem;">
                                                📂 <?php echo htmlspecialchars($job['sector_name']); ?>
                                            </p>
                                            <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.4;">
                                                <?php echo substr(htmlspecialchars($job['description_' . $lang] ?? $job['description_fr']), 0, 120) . '...'; ?>
                                            </p>
                                        </div>
                                        <div style="display: flex; gap: 0.5rem; margin-left: 1rem;">
                                            <a href="job.php?id=<?php echo $job['id']; ?>" style="color: #3b82f6; text-decoration: none; padding: 0.5rem; border-radius: 6px; background: rgba(59, 130, 246, 0.1); transition: background 0.3s ease;" onmouseover="this.style.background='rgba(59, 130, 246, 0.2)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.1)'">
                                                👁️
                                            </a>
                                            <button onclick="toggleFavorite(<?php echo $job['id']; ?>)" style="color: #ef4444; background: rgba(239, 68, 68, 0.1); border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; transition: background 0.3s ease;" onmouseover="this.style.background='rgba(239, 68, 68, 0.2)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'">
                                                ❤️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Quick Actions -->
                <div style="background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 2rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                    <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        🚀 Actions rapides
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <a href="sectors.php" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 1.5rem; text-decoration: none; color: white; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏭</div>
                            <div style="font-weight: 600;">Explorer les secteurs</div>
                        </a>

                        <a href="jobs.php" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 1.5rem; text-decoration: none; color: white; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(16, 185, 129, 0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">💼</div>
                            <div style="font-weight: 600;">Voir tous les emplois</div>
                        </a>

                        <a href="favorites.php" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 1.5rem; text-decoration: none; color: white; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(239, 68, 68, 0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">❤️</div>
                            <div style="font-weight: 600;">Mes favoris</div>
                        </a>

                        <a href="profile.php" style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; padding: 1.5rem; text-decoration: none; color: white; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(251, 191, 36, 0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👤</div>
                            <div style="font-weight: 600;">Mon profil</div>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    
    <script src="../assets/js/main.js"></script>
    <script>
        function updateSlider(event, sliderId) {
            const wrapper = event.currentTarget;
            const rect = wrapper.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            const fill = document.getElementById(sliderId + '-fill');
            const thumb = document.getElementById(sliderId + '-thumb');
            const value = document.getElementById(sliderId + '-value');
            
            fill.style.width = percentage + '%';
            thumb.style.left = percentage + '%';
            value.textContent = Math.round(percentage) + '%';
        }

        function toggleFavorite(jobId) {
            fetch('../includes/toggle_favorite.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'job_id=' + jobId
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                }
            });
        }
    </script>
</body>
</html>