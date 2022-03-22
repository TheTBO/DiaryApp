<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\Person;
use App\Models\User;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Event::truncate();
        foreach(Person::all() as $person){
            Event::factory()
                    ->count(20)
                    ->create([
                        'person_id' => $person->id
                    ]);
        }
        
    }
}
