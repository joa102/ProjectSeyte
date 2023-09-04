<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cliente;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProgramadorRiegoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        return [
            'modelo' => $this->faker->randomElement(['A', 'B', 'C']),
            'numero_serie' => $this->faker->unique()->numerify('######'),
            'fecha_alta' => $this->faker->date,
            'fecha_ultima_conexion' => $this->faker->date,
            'cliente_id' => function () {
                return Cliente::factory();
            },
        ];
    }
}
