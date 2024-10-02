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
            ->get();

        $this->table(['ID', 'Título', 'Estado', 'Fecha de Vencimiento'], $notes->toArray());
    }
}
