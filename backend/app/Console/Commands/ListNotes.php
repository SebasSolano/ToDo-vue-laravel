<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Note;

class ListNotes extends Command
{
    protected $signature = 'notes:list {user_id} {--sortBy=created_at}';

    protected $description = 'Listar notas de un usuario';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $sortBy = $this->option('sortBy');

        $notes = Note::where('user_id', $userId)
            ->orderBy($sortBy, 'asc')
            ->get(['id', 'title', 'status', 'expiration_date', 'tags']);

        // Procesamos las notas para asegurarnos de que los valores son escalares
        $notesArray = $notes->map(function ($note) {
            return [
                'ID' => $note->id,
                'Título' => $note->title,
                'Estado' => $note->status,
                'Fecha de Vencimiento' => $note->expiration_date,
                'Etiquetas' => implode(', ', $note->tags), // Convertimos el array de tags a una cadena
            ];
        })->toArray();

        $this->table(
            ['ID', 'Título', 'Estado', 'Fecha de Vencimiento', 'Etiquetas'],
            $notesArray
        );
    }
}
