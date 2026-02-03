git clone -b master https://github.com/Oihan-Etxeberria/marblow.git
cd marblow
composer update
composer install
npm install
php artisan migrate
- si esto no va:
- sudo apt update
- sudo apt install php-sqlite3
php artisan db:seed

poner en marcha:
php artisan serve --host=0.0.0.0
npm run dev
