# Usamos Node para compilar los assets de React
FROM node:20 AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Imagen base de PHP con FPM (FastCGI Process Manager)
FROM php:8.2-fpm

# Instalamos dependencias del sistema necesarias para Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Instalamos extensiones de PHP que requiere Laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Instalamos Composer (copiándolo desde la imagen oficial)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definimos el directorio de trabajo
WORKDIR /var/www

# Copiamos los archivos del proyecto
COPY . .

# Copiamos los archivos compilados de React desde la "Etapa 1"
COPY --from=frontend-builder /app/public/build ./public/build

# Instalamos las dependencias de PHP (Laravel)
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Ajustamos permisos para que Laravel pueda escribir en storage y bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
