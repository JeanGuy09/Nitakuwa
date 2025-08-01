<header class="header">
    <div class="container">
        <div class="header-content">
            <a href="/kongenga_php/" class="logo">
                <div class="logo-icon">K</div>
                KONGENGA
            </a>
            
            <nav class="nav-menu">
                <a href="/kongenga_php/" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">
                    <?php echo $translations['home']; ?>
                </a>
                <a href="/kongenga_php/pages/sectors.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'sectors.php' ? 'active' : ''; ?>">
                    <?php echo $translations['sectors']; ?>
                </a>
                <a href="/kongenga_php/pages/jobs.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'jobs.php' ? 'active' : ''; ?>">
                    <?php echo $translations['jobs']; ?>
                </a>
                <a href="/kongenga_php/pages/about.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'about.php' ? 'active' : ''; ?>">
                    <?php echo $translations['about']; ?>
                </a>
            </nav>
            
            <div class="nav-actions">
                <select class="language-selector" onchange="changeLanguage(this.value)">
                    <option value="fr" <?php echo $lang == 'fr' ? 'selected' : ''; ?>>🇫🇷 FR</option>
                    <option value="en" <?php echo $lang == 'en' ? 'selected' : ''; ?>>🇬🇧 EN</option>
                </select>
                
                <?php if (isLoggedIn()): ?>
                    <a href="/kongenga_php/pages/dashboard.php" class="nav-link">
                        <?php echo $translations['dashboard']; ?>
                    </a>
                    <a href="/kongenga_php/pages/favorites.php" class="nav-link">
                        <?php echo $translations['favorites']; ?>
                    </a>
                    <a href="/kongenga_php/pages/logout.php" class="btn btn-outline">
                        <?php echo $translations['logout']; ?>
                    </a>
                <?php else: ?>
                    <a href="/kongenga_php/pages/login.php" class="nav-link">
                        <?php echo $translations['login']; ?>
                    </a>
                    <a href="/kongenga_php/pages/register.php" class="btn btn-primary">
                        <?php echo $translations['register']; ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</header>

<script>
function changeLanguage(lang) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/kongenga_php/includes/set_language.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload();
        }
    };
    xhr.send('lang=' + lang);
}
</script>