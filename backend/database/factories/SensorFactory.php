<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProgramadorRiego;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SensorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        return [
            'nombre_sonda' => $this->faker->randomElement(['S1', 'S2', 'S3', 'S4']),
            'programador_riego_id' => function () {
                return ProgramadorRiego::factory();
            },
        ];
    }
}
