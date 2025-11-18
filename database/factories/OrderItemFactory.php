<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'device_title' => $this->faker->name,
            'price' => $this->faker->numberBetween(1, 100),
            'quantity' => $this->faker->numberBetween(1, 5)
        ];
    }
}
