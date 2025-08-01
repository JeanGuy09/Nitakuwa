<?php
// Initialize KONGENGA Database
require_once '../config/database.php';

echo "Initializing KONGENGA Database...\n";

try {
    $pdo = getConnection();
    
    // Create database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS kongenga_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Database created/verified\n";
    
    // Use the database
    $pdo->exec("USE kongenga_db");
    
    // Check if sample data already exists
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE email = 'admin@kongenga.cd'");
    $result = $stmt->fetch();
    
    if ($result['count'] == 0) {
        // Load sample data
        $sampleDataFile = '../database/sample_data.sql';
        if (file_exists($sampleDataFile)) {
            $sql = file_get_contents($sampleDataFile);
            $statements = explode(';', $sql);
            
            foreach ($statements as $statement) {
                $statement = trim($statement);
                if (!empty($statement)) {
                    $pdo->exec($statement);
                }
            }
            echo "✅ Sample data loaded successfully\n";
        } else {
            echo "⚠️  Sample data file not found\n";
        }
    } else {
        echo "✅ Sample data already exists\n";
    }
    
    // Update job counts for sectors
    $pdo->exec("
        UPDATE sectors s 
        SET job_count = (
            SELECT COUNT(*) 
            FROM jobs j 
            WHERE j.sector_id = s.id AND j.is_active = TRUE
        )
    ");
    echo "✅ Job counts updated\n";
    
    echo "\n🎉 KONGENGA Database initialized successfully!\n";
    echo "\nDemo accounts:\n";
    echo "Admin: admin@kongenga.cd / admin123\n";
    echo "Student: student@kongenga.cd / student123\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>