<footer class="footer" style="background: #111827; color: #d1d5db; padding: 4rem 0 2rem;">
    <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <!-- About -->
            <div>
                <h3 style="color: white; margin-bottom: 1rem; font-size: 1.2rem;">KONGENGA</h3>
                <p style="line-height: 1.6; margin-bottom: 1rem;">
                    <?php echo $translations['footer_description']; ?>
                </p>
                <div class="gradient-line" style="width: 60px;"></div>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h4 style="color: white; margin-bottom: 1rem;"><?php echo $translations['quick_links']; ?></h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <a href="/kongenga_php/" style="color: #9ca3af; text-decoration: none; transition: color 0.3s ease;">
                        <?php echo $translations['home']; ?>
                    </a>
                    <a href="/kongenga_php/pages/sectors.php" style="color: #9ca3af; text-decoration: none; transition: color 0.3s ease;">
                        <?php echo $translations['sectors']; ?>
                    </a>
                    <a href="/kongenga_php/pages/jobs.php" style="color: #9ca3af; text-decoration: none; transition: color 0.3s ease;">
                        <?php echo $translations['jobs']; ?>
                    </a>
                    <a href="/kongenga_php/pages/about.php" style="color: #9ca3af; text-decoration: none; transition: color 0.3s ease;">
                        <?php echo $translations['about']; ?>
                    </a>
                </div>
            </div>
            
            <!-- Contact Info -->
            <div>
                <h4 style="color: white; margin-bottom: 1rem;"><?php echo $translations['contact_info']; ?></h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; color: #9ca3af;">
                    <p>📧 contact@kongenga.cd</p>
                    <p>📱 +243 XXX XXX XXX</p>
                    <p>📍 Kinshasa, RDC</p>
                </div>
            </div>
            
            <!-- Social Media -->
            <div>
                <h4 style="color: white; margin-bottom: 1rem;"><?php echo $translations['follow_us']; ?></h4>
                <div style="display: flex; gap: 1rem;">
                    <a href="#" style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; transition: transform 0.3s ease;">
                        📘
                    </a>
                    <a href="#" style="width: 40px; height: 40px; background: linear-gradient(135deg, #1da1f2, #0d8bd9); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; transition: transform 0.3s ease;">
                        🐦
                    </a>
                    <a href="#" style="width: 40px; height: 40px; background: linear-gradient(135deg, #0077b5, #005885); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; transition: transform 0.3s ease;">
                        💼
                    </a>
                </div>
            </div>
        </div>
        
        <div style="border-top: 1px solid #374151; padding-top: 2rem; text-align: center; color: #6b7280;">
            <p>&copy; <?php echo date('Y'); ?> KONGENGA. <?php echo $translations['copyright']; ?></p>
        </div>
    </div>
</footer>

<style>
.footer a:hover {
    color: #3b82f6 !important;
}

.footer a[style*="background"]:hover {
    transform: translateY(-2px);
}
</style>