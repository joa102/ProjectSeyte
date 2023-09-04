<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cliente>
 */
class ClienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        return [
            'codigo' => $this->faker->unique()->randomNumber(),
            'razon_social' => $this->faker->company,
            'cif'=> $this->faker->unique()->bothify('?########'),
            'direccion' => $this->faker->address,
            'municipio' => $this->faker->city,
            'provincia' => $this->faker->state,
            'fecha_inicio_contrato' => $this->faker->date,
            'fecha_expiracion_contrato' => $this->faker->date,
        ];
    }
}
