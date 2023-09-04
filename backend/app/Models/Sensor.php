<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    use HasFactory;

    protected $table = 'sensores';

    protected $fillable = [
        'nombre_sonda',
        'programador_riego_id',
    ];

    public function programadorRiego()
    {
        return $this->belongsTo(ProgramadorRiego::class);
    }

    public function medidas()
    {
        return $this->hasMany(Medida::class);
    }
}
