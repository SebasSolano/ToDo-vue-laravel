<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Note;
use App\Models\User;
use Carbon\Carbon;

class AddNote extends Command
{
    protected $signature = 'notes:add
                            {user_id : User ID}
                            {title : Note title}
                            {description : Note description}
                            {expiration_date : Expiration date (YYYY-MM-DD)}
                            {--tags=* : Note tags}
                            {--status=active : Note status (active, completed, expired)}';

    protected $description = 'Add a new note associated with a user';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $title = $this->argument('title');
        $description = $this->argument('description');
        $expirationDate = $this->argument('expiration_date');
        $tags = $this->option('tags');
        $status = $this->option('status');

        // Validate the status
        if (!in_array($status, ['active', 'completed', 'expired'])) {
            $this->error('Invalid status. Must be "active", "completed", or "expired".');
            return;
        }

        // Validate that the user exists
        $user = User::find($userId);
        if (!$user) {
            $this->error('User not found.');
            return;
        }

        // Validate the expiration date
        if (!Carbon::createFromFormat('Y-m-d', $expirationDate)) {
            $this->error('Invalid expiration date. Must be in YYYY-MM-DD format.');
            return;
        }

        // Create the note
        $note = Note::create([
            'title' => $title,
            'description' => $description,
            'user_id' => $userId,
            'expiration_date' => $expirationDate,
            'tags' => $tags,
            'status' => $status,
        ]);

        $this->info('Note created successfully with ID: ' . $note->id);
    }
}
