<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProgramadorRiego;
use App\Models\Sensor;

class SensoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $programadoresRiego = ProgramadorRiego::all();
        $sensores = ['S1', 'S2', 'S3', 'S4']; // 4 sensores por programador

        foreach ($programadoresRiego as $programadorRiego) {
            foreach ($sensores as $sensor) {
                Sensor::factory()->create([
                    'programador_riego_id' => $programadorRiego->id,
                    'nombre_sonda' => $sensor
                ]);
            }
        }
    }
}
