<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;


use App\Models\Person;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(), 
            'type'=> random_int(1,3), 
            'date' => $this->faker->dateTimeThisMonth()->format('Y-m-d'),
            'time' => $this->faker->time('H:i'),
            'note'  => $this->faker->sentence(),
            'person_id' => Person::all()->random(),
        ];
    }
}
