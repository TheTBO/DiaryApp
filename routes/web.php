<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PersonController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function () {
    return Inertia::render("Welcome", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
        "laravelVersion" => Application::VERSION,
        "phpVersion" => PHP_VERSION,
    ]);
});

Route::get("/calender", [UserController::class, "calender"])
    ->middleware(["auth", "verified"])
    ->name("calender");

Route::post("/calender", [EventController::class, "store"])
    ->middleware(["auth", "verified"])
    ->name("calender.post");

Route::patch("/calender/{event}", [EventController::class, "update"])
    ->middleware(["auth", "verified"])
    ->name("calender.patch");

Route::delete("/calender/{event}", [EventController::class, "delete"])
    ->middleware(["auth", "verified"])
    ->name("calender.delete");

Route::post("/events", [EventController::class, "index"])->middleware([
    "auth",
    "verified",
]);

Route::get("/people", [PersonController::class, "index"])
    ->middleware(["auth", "verified"])
    ->name("people");

Route::post("/people/default", [PersonController::class, "default"])
    ->middleware(["auth", "verified"])
    ->name("people.default");

Route::post("/person", [PersonController::class, "store"])->middleware([
    "auth",
    "verified",
]);

Route::patch("/person", [PersonController::class, "update"])->middleware([
    "auth",
    "verified",
]);

Route::patch("/people/default", [
    UserController::class,
    "update_default",
])->middleware(["auth", "verified"]);

Route::delete("/person/{person}", [
    PersonController::class,
    "delete",
])->middleware(["auth", "verified"]);

require __DIR__ . "/auth.php";
