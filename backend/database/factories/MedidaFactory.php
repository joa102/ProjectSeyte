<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Sensor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MedidaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        return [
            'fecha_hora_medida' => $this->faker->dateTimeThisYear,
            'valor' => $this->faker->randomFloat(2, 0, 100),
            'sensor_id' => function () {
                return Sensor::factory();
            },
        ];
    }
}
