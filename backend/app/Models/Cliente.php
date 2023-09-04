<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';

    protected $fillable = [
        'codigo',
        'razon_social',
        'cif',
        'direccion',
        'municipio',
        'provincia',
        'fecha_inicio_contrato',
        'fecha_expiracion_contrato',
    ];

    public function programadoresRiego()
    {
        return $this->hasMany(ProgramadorRiego::class);
    }
}
