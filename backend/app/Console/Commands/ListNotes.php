<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Note;

class ListNotes extends Command
{
    protected $signature = 'notes:list {user_id} {--sortBy=created_at}';

    protected $description = 'List notes of a user';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $sortBy = $this->option('sortBy');

        $notes = Note::where('user_id', $userId)
            ->orderBy($sortBy, 'asc')
            ->get(['id', 'title', 'status', 'expiration_date', 'tags']);

        // Process the notes to ensure the values are scalar
        $notesArray = $notes->map(function ($note) {
            return [
                'ID' => $note->id,
                'Title' => $note->title,
                'Status' => $note->status,
                'Expiration Date' => $note->expiration_date,
                'Tags' => implode(', ', $note->tags),
            ];
        })->toArray();

        $this->table(
            ['ID', 'Title', 'Status', 'Expiration Date', 'Tags'],
            $notesArray
        );
    }
}
