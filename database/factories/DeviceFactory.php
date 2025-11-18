<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'model' => 'apple',
        'serial_number' => strtoupper(Str::random(10)),
        'invent_number' => $this->faker->numberBetween(10000, 11000),
        'image' => $this->faker->imageUrl(),
        'description' => $this->faker->text(), // ← исправлено
        ];
    }
}
