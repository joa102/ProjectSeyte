<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramadorRiego extends Model
{
    use HasFactory;

    protected $table = 'programadores_riego';

    protected $fillable = [
        'modelo',
        'numero_serie',
        'fecha_alta',
        'fecha_ultima_conexion',
        'cliente_id',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function sensores()
    {
        return $this->hasMany(Sensor::class);
    }
}
