<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sensor;
use App\Models\Medida;

class MedidasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sensores = Sensor::all();

        $startDate = now()->subDays(365); // Hace un año
        $endDate = now();

        $interval = \DateInterval::createFromDateString('5 minutes');
        $period = new \DatePeriod($startDate, $interval, $endDate);

        foreach ($sensores as $sensor) {
            $contador = 0;
            foreach ($period as $date) {
                Medida::factory()->create([
                    'fecha_hora_medida' => $date,
                    'sensor_id' => $sensor->id,
                ]);
                $contador++;
                if ($contador >= 1000) {
                    break; // 1000 medidas por sensor
                }
            }
        }
    }
}
