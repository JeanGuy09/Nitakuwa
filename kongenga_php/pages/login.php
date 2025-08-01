<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

// Redirect if already logged in
if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
$success = '';

if ($_POST) {
    $email = sanitizeInput($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        $error = 'Tous les champs sont requis.';
    } else {
        if (login($email, $password)) {
            $success = 'Connexion réussie ! Redirection...';
            header('refresh:2;url=dashboard.php');
        } else {
            $error = 'Email ou mot de passe incorrect.';
        }
    }
}

// Get user language preference
$lang = $_SESSION['lang'] ?? 'fr';
require_once "../lang/{$lang}.php";
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $translations['login']; ?> - KONGENGA</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <main style="padding-top: 100px; min-height: 100vh; background: #111827;">
        <div class="container">
            <div style="max-width: 500px; margin: 4rem auto; background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 3rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h1 style="color: white; font-size: 2.5rem; margin-bottom: 0.5rem;">
                        <?php echo $translations['login']; ?>
                    </h1>
                    <div class="gradient-line" style="width: 80px;"></div>
                    <p style="color: #9ca3af; margin-top: 1rem;">
                        Accédez à votre compte KONGENGA
                    </p>
                </div>

                <?php if ($error): ?>
                    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center;">
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>

                <?php if ($success): ?>
                    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center;">
                        <?php echo $success; ?>
                    </div>
                <?php endif; ?>

                <form method="POST" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div>
                        <label for="email" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['email']; ?>
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <div>
                        <label for="password" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['password']; ?>
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <button type="submit" class="btn btn-primary gradient-btn" style="width: 100%; padding: 1rem; font-size: 1.1rem; margin-top: 1rem;">
                        <?php echo $translations['login']; ?>
                    </button>
                </form>

                <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #374151;">
                    <p style="color: #9ca3af;">
                        Pas encore de compte ?
                        <a href="register.php" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                            <?php echo $translations['register']; ?>
                        </a>
                    </p>
                </div>

                <!-- Demo Credentials -->
                <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px; padding: 1rem; margin-top: 1.5rem;">
                    <h4 style="color: #3b82f6; margin-bottom: 0.5rem; font-size: 0.9rem;">Comptes de démonstration :</h4>
                    <div style="color: #9ca3af; font-size: 0.85rem; line-height: 1.4;">
                        <p><strong>Admin:</strong> admin@kongenga.cd / admin123</p>
                        <p><strong>Étudiant:</strong> student@kongenga.cd / student123</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <script src="../assets/js/main.js"></script>
</body>
</html>