<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Note;

class EditNote extends Command
{
    protected $signature = 'notes:edit {note_id} {--title=} {--description=} {--expiration_date=} {--tags=*} {--status=}';

    protected $description = 'Edit an existing note';

    public function handle()
    {
        $noteId = $this->argument('note_id');
        $note = Note::find($noteId);

        if (!$note) {
            $this->error('Note not found.');
            return;
        }

        $data = [];

        if ($this->option('title')) {
            $data['title'] = $this->option('title');
        }

        if ($this->option('description')) {
            $data['description'] = $this->option('description');
        }

        if ($this->option('expiration_date')) {
            $data['expiration_date'] = $this->option('expiration_date');
        }

        if ($this->option('tags')) {
            $data['tags'] = $this->option('tags');
        }

        if ($this->option('status')) {
            $status = $this->option('status');
            if (!in_array($status, ['active', 'completed', 'expired'])) {
                $this->error('Invalid status. Must be "active", "completed", or "expired".');
                return;
            }
            $data['status'] = $status;
        }

        if (empty($data)) {
            $this->info('No data provided to update.');
            return;
        }

        $note->update($data);

        $this->info('Note updated successfully.');
    }
}
