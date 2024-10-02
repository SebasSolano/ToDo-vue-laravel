<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NoteTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_note()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/notes', [
            'title' => 'Nota de prueba',
            'description' => 'Descripción de la nota',
            'expiration_date' => now()->addDays(5)->toDateString(),
            'tags' => ['importante', 'trabajo'],
            'status' => 'active',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('notes', ['title' => 'Nota de prueba']);
    }
}
