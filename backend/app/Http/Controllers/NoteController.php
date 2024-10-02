<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    // Create note
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'expiration_date' => 'required|date',
            'tags' => 'required|array',
            'status' => 'in:active,completed,expired',
        ]);

        $note = Note::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::id(),
            'expiration_date' => $request->expiration_date,
            'tags' => $request->tags,
            'status' => $request->status ?? 'active',
        ]);

        return response()->json($note, 201);
    }

    // List notes
    public function index(Request $request)
    {
        $sortBy = $request->query('sortBy', 'created_at');

        $notes = Note::where('user_id', Auth::id())
            ->orderBy($sortBy, 'asc')
            ->get();

        return response()->json($notes, 200);
    }

    // Show note by ID
    public function show($id)
    {
        $note = Note::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return response()->json($note, 200);
    }

    public function getNotesByUserId($userId)
    {
        $currentUser = Auth::user();

        // Check if the user is an administrator
        if (!$currentUser->is_admin) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $notes = Note::where('user_id', $userId)->get();

        return response()->json($notes, 200);
    }

    // Update note
    public function update(Request $request, $id)
    {
        $note = Note::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $request->validate([
            'title' => 'sometimes|required',
            'description' => 'sometimes|required',
            'expiration_date' => 'sometimes|required|date',
            'tags' => 'sometimes|required|array',
            'status' => 'in:active,completed,expired',
        ]);

        $note->update($request->all());

        return response()->json($note, 200);
    }

    // Delete note
    public function destroy($id)
    {
        $note = Note::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $note->delete();

        return response()->json(['message' => 'Note deleted'], 200);
    }
}
