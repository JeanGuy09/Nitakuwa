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
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $fullName = sanitizeInput($_POST['full_name'] ?? '');
    $university = sanitizeInput($_POST['university'] ?? '');
    $field = sanitizeInput($_POST['field'] ?? '');
    
    if (empty($email) || empty($password) || empty($fullName)) {
        $error = 'Les champs Email, Mot de passe et Nom complet sont requis.';
    } elseif ($password !== $confirmPassword) {
        $error = 'Les mots de passe ne correspondent pas.';
    } elseif (strlen($password) < 6) {
        $error = 'Le mot de passe doit contenir au moins 6 caractères.';
    } else {
        if (register($email, $password, $fullName, $university, $field)) {
            $success = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        } else {
            $error = 'Erreur lors de l\'inscription. Cet email existe peut-être déjà.';
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
    <title><?php echo $translations['register']; ?> - KONGENGA</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <main style="padding-top: 100px; min-height: 100vh; background: #111827;">
        <div class="container">
            <div style="max-width: 600px; margin: 4rem auto; background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; padding: 3rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h1 style="color: white; font-size: 2.5rem; margin-bottom: 0.5rem;">
                        <?php echo $translations['register']; ?>
                    </h1>
                    <div class="gradient-line" style="width: 80px;"></div>
                    <p style="color: #9ca3af; margin-top: 1rem;">
                        Créez votre compte KONGENGA et commencez votre parcours professionnel
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
                        <div style="margin-top: 1rem;">
                            <a href="login.php" class="btn btn-primary" style="display: inline-block; padding: 0.5rem 1.5rem;">
                                Se connecter maintenant
                            </a>
                        </div>
                    </div>
                <?php endif; ?>

                <form method="POST" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    <div style="grid-column: 1 / -1;">
                        <label for="full_name" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['full_name']; ?> *
                        </label>
                        <input 
                            type="text" 
                            id="full_name" 
                            name="full_name" 
                            required
                            value="<?php echo htmlspecialchars($_POST['full_name'] ?? ''); ?>"
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <div style="grid-column: 1 / -1;">
                        <label for="email" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['email']; ?> *
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
                            <?php echo $translations['password']; ?> *
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                            minlength="6"
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <div>
                        <label for="confirm_password" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['confirm_password']; ?> *
                        </label>
                        <input 
                            type="password" 
                            id="confirm_password" 
                            name="confirm_password" 
                            required
                            minlength="6"
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <div>
                        <label for="university" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['university']; ?>
                        </label>
                        <input 
                            type="text" 
                            id="university" 
                            name="university"
                            value="<?php echo htmlspecialchars($_POST['university'] ?? ''); ?>"
                            placeholder="Ex: Université de Kinshasa"
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <div>
                        <label for="field" style="display: block; color: #d1d5db; margin-bottom: 0.5rem; font-weight: 500;">
                            <?php echo $translations['field_of_study']; ?>
                        </label>
                        <input 
                            type="text" 
                            id="field" 
                            name="field"
                            value="<?php echo htmlspecialchars($_POST['field'] ?? ''); ?>"
                            placeholder="Ex: Informatique, Médecine, Économie"
                            style="width: 100%; padding: 1rem; border: 2px solid #374151; border-radius: 8px; background: #1f2937; color: white; font-size: 1rem; transition: border-color 0.3s ease;"
                            onfocus="this.style.borderColor='#3b82f6'"
                            onblur="this.style.borderColor='#374151'"
                        >
                    </div>

                    <div style="grid-column: 1 / -1; margin-top: 1rem;">
                        <button type="submit" class="btn btn-primary gradient-btn" style="width: 100%; padding: 1rem; font-size: 1.1rem;">
                            <?php echo $translations['register']; ?>
                        </button>
                    </div>
                </form>

                <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #374151;">
                    <p style="color: #9ca3af;">
                        Déjà un compte ?
                        <a href="login.php" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                            <?php echo $translations['login']; ?>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <script src="../assets/js/main.js"></script>
</body>
</html>