<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        User::factory()
                    ->create([
                        'name' => 'me',
                        'email' => 'taba1950@gmail.com',
                        'password' => Hash::make('AcKU*rvEc3Q7AQRPeyhzridFtkHCvG'),
                    ]);
        User::factory()
                    ->count(20)
                    ->create();
    }
}
