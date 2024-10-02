<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Note;

class DeleteNote extends Command
{
    protected $signature = 'notes:delete {note_id}';

    protected $description = 'Delete an existing note';

    public function handle()
    {
        $noteId = $this->argument('note_id');
        $note = Note::find($noteId);

        if (!$note) {
            $this->error('Note not found.');
            return;
        }

        $note->delete();

        $this->info('Note deleted successfully.');
    }
}
