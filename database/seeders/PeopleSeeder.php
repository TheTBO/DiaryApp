<?php

namespace Database\Seeders;

use App\Models\Person;
use Illuminate\Database\Seeder;
use App\Models\User;

class PeopleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Person::truncate();
        foreach(User::all() as $user){
            Person::factory()->count(5)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
