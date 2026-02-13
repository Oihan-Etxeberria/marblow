########################################
# 1️⃣ STAGE FRONTEND (React + Vite)
########################################
FROM node:20-alpine AS frontend

WORKDIR /app

# Copiamos solo lo necesario para instalar deps
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instala dependencias (elige el que uses)
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Compila los assets
RUN npm run build


########################################
# 2️⃣ STAGE BACKEND (PHP + Apache)
########################################
FROM php:8.2-apache

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    sqlite3 \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Extensiones PHP necesarias para Laravel
RUN docker-php-ext-install \
    pdo_mysql \
    pdo_sqlite \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# Apache config
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www/html

# Copiamos el backend
COPY . .

# Copiamos los assets ya compilados desde Node
COPY --from=frontend /app/public/build ./public/build

# Instalamos dependencias PHP
RUN composer install --no-interaction --no-dev --optimize-autoloader

# SQLite + permisos
RUN mkdir -p database storage bootstrap/cache \
    && touch database/database.sqlite \
    && chown -R www-data:www-data storage bootstrap/cache database

EXPOSE 80
