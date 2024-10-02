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
            'title' => 'Test Note',
            'description' => 'Note description',
            'expiration_date' => now()->addDays(5)->toDateString(),
            'tags' => ['important', 'work'],
            'status' => 'active',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('notes', ['title' => 'Test Note']);
    }

    public function test_user_can_get_their_notes()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        Note::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        $response = $this->getJson('/api/notes');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_guest_cannot_access_protected_routes()
    {
        // Attempt to access the list of notes without authentication
        $response = $this->getJson('/api/notes');

        $response->assertStatus(401); // 401 Unauthorized
    }
}
