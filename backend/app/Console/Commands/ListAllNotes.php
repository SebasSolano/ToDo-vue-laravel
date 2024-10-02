<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Note;

class ListAllNotes extends Command
{
    protected $signature = 'notes:list-all {--sortBy=created_at}';

    protected $description = 'List all notes from all users';

    public function handle()
    {
        $sortBy = $this->option('sortBy');

        $notes = Note::orderBy($sortBy, 'asc')->get(['id', 'title', 'user_id', 'status', 'expiration_date', 'tags']);

        // Process the notes for the table
        $notesArray = $notes->map(function ($note) {
            return [
                'ID' => $note->id,
                'Title' => $note->title,
                'User ID' => $note->user_id,
                'Status' => $note->status,
                'Expiration Date' => $note->expiration_date,
                'Tags' => implode(', ', $note->tags),
            ];
        })->toArray();

        $this->table(
            ['ID', 'Title', 'User ID', 'Status', 'Expiration Date', 'Tags'],
            $notesArray
        );
    }
}
