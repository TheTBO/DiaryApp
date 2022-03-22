<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PersonController extends Controller
{
    public function index()
    {
        $people = Auth::user()->people->map(function ($person) {
            return $person->only(["name", "id"]);
        });
        return $people;
    }

    public function default()
    {
        $default = Auth::user()->default_person;
        if ($default):
            return Person::find($default)->only(["name", "id"]);
        else:
            return Auth::user()
                ->people()
                ->first()
                ->only(["name", "id"]);
        endif;
    }

    public function store(Request $request)
    {
        $person = Auth::user()
            ->people()
            ->create(
                $request->validate([
                    "name" => ["required", "string"],
                ])
            );

        return $person->only(["name", "id"]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            "person" => "required",
            "name" => ["required", "string"],
        ]);

        $person = Auth::user()
            ->people()
            ->find($validated["person"]);
        $person->update(["name" => $validated["name"]]);
    }

    public function delete(Person $person)
    {
        $person->delete();

        return response()->json([], 204);
    }
}
