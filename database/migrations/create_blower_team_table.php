<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blower_team', function (Blueprint $table) { // Cambiado a 'blower_team'
            $table->id();
            $table->foreignId('blower_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['blower_id', 'team_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blower_team'); // Cambiado a 'blower_team'
    }
};