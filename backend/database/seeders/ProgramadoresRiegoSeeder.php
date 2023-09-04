<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;
use App\Models\ProgramadorRiego;

class ProgramadoresRiegoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cliente::all()->each(function ($cliente) {
            ProgramadorRiego::factory(30)->create(['cliente_id' => $cliente->id]); // 30 programadores por cliente
        });
    }
}
