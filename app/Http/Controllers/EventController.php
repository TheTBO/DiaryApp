<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            "person" => ["required"],
            "month" => ["required", "digits_between:1,12"],
            "year" => ["required", "numeric"],
        ]);

        $person = $user
            ->people()
            ->where("id", $validated["person"])
            ->firstOrFail();

        $events = $person
            ->events()
            ->whereYear("date", "=", $validated["year"])
            ->whereMonth("date", ">=", $validated["month"] - 1)
            ->whereMonth("date", "<=", $validated["month"] + 1)
            ->get();
        return $events;
    }

    public function store(Request $request)
    {
        Auth::user()
            ->people()
            ->first()
            ->events()
            ->create(
                $request->validate([
                    "title" => ["required", "string"],
                    "note" => ["nullable", "string"],
                    "type" => ["required", "digits_between:1,3"],
                    "date" => ["required", "date_format:Y-m-d"],
                    "time" => ["required", "date_format:H:i"],
                ])
            );

        return Redirect::route("calender")->with("success", "Event created.");
    }

    public function show(Event $event)
    {
        return $event;
    }

    public function update(Request $request, Event $event)
    {
        $event->update(
            $request->validate([
                "title" => ["sometimes", "required", "string"],
                "note" => ["sometimes", "nullable", "string"],
                "type" => ["sometimes", "required", "digits_between:1,3"],
                "date" => ["sometimes", "required", "date_format:Y-m-d"],
                "time" => ["sometimes", "required", "date_format:H:i"],
            ])
        );

        return Redirect::route("calender")->with("success", "Event Edited.");
    }

    public function delete(Event $event)
    {
        $event->delete();

        return Redirect::route("calender")->with("success", "Event deleted.");
    }
}
