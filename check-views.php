<?php
// check-views.php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

echo "=== Verificación de Vistas ===\n\n";

$views = [
    // Páginas públicas
    'pages.home' => [],
    'pages.teams' => ['teams' => []],
    'pages.team' => ['team' => new class {
        public $name = 'Test Team';
        public $slug = 'test';
        public $logo = null;
        public $description = null;
        public $blowers = collect([]);
    }],
    'pages.blowers' => ['blowers' => []],
    'pages.blower' => ['blower' => new class {
        public $name = 'Test';
        public $surname = 'Blower';
        public $description = 'Test';
        public $age = 25;
        public $pulmon_capacity = 70;
        public $smoking_years = 5;
        public $image_path = '/Blowers/default.jpg';
        public $events = collect([]);
        public $url = '#';
    }],
    'pages.contact' => [],
    'pages.login' => [],
    'pages.register' => [],
    
    // Vistas de admin
    'admin.teams.create' => ['blowers' => []],
    'admin.teams.edit' => [
        'team' => new class {
            public $id = 1;
            public $name = 'Test';
            public $slug = 'test';
            public $logo = null;
            public $description = null;
            public $blowers = collect([]);
        },
        'blowers' => []
    ],
    'admin.blowers.create' => [],
    'admin.blowers.edit' => [
        'blower' => new class {
            public $id = 1;
            public $name = 'Test';
            public $surname = 'Blower';
            public $description = 'Test';
            public $age = 25;
            public $pulmon_capacity = 70;
            public $smoking_years = 5;
            public $image_path = '/Blowers/default.jpg';
            public $lung_capacity = 6.5;
        },
        'events' => []
    ],
];

foreach ($views as $view => $data) {
    $viewPath = resource_path('views/' . str_replace('.', '/', $view) . '.blade.php');
    
    if (file_exists($viewPath)) {
        $size = filesize($viewPath);
        echo "✓ " . $view . " (" . ($size / 1024) . " KB)\n";
    } else {
        echo "✗ " . $view . " - NO EXISTE\n";
        echo "  Ruta esperada: " . $viewPath . "\n";
    }
}

echo "\n=== Creando vistas faltantes... ===\n";

// Crear directorios necesarios
$directories = [
    'pages',
    'admin/teams',
    'admin/blowers',
    'components',
    'layouts'
];

foreach ($directories as $dir) {
    $path = resource_path('views/' . $dir);
    if (!is_dir($path)) {
        mkdir($path, 0755, true);
        echo "  ✓ Directorio creado: views/" . $dir . "\n";
    }
}