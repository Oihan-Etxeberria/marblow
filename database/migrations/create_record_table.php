<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('record', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blower_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->integer('rank');
            $table->string('time');
            $table->integer('top_blow');
            $table->timestamps();
            
            $table->unique(['blower_id', 'event_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('record');
    }
};