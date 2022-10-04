<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update_default()
    {
        $validated = Request::validate([
            "person" => "required",
        ]);

        Auth::user()->update([
            "default_person" => $validated["person"]["id"],
        ]);
    }

    public function calender()
    {
        return Inertia::render("Calender");
    }
}
