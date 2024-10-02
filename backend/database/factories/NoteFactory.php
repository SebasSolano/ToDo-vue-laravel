<?php

namespace Database\Factories;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoteFactory extends Factory
{
    protected $model = Note::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'user_id' => User::factory(),
            'expiration_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'tags' => $this->faker->words(3),
            'status' => $this->faker->randomElement(['active', 'completed', 'expired']),
        ];
    }
}
