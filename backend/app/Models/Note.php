<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Note extends Model
{

    use HasFactory;


    protected $fillable = [
        'title',
        'description',
        'user_id',
        'expiration_date',
        'tags',
        'status',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
