<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('blowers')) {
            Schema::create('blowers', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('name');
                $table->string('surname');
                $table->text('description');
                $table->integer('age');
                $table->integer('pulmon_capacity');
                $table->integer('smoking_years');
                $table->string('image_path');
                $table->decimal('lung_capacity', 5, 2)->nullable(); // Para vista de catálogo
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('blowers');
    }
};