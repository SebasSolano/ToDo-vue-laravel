<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // User registration
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('token-personal')->plainTextToken;

        return response()->json(['token' => $token], 201);
    }

    // User login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect credentials'], 401);
        }

        $token = $user->createToken('token-personal')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    // User logout
    public function logout(Request $request)
    {
        // Revoke the token used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Session closed successfully'], 200);
    }
}
