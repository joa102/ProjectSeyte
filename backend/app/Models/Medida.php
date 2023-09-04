<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medida extends Model
{
    use HasFactory;

    protected $table = 'medidas';

    protected $fillable = [
        'fecha_hora_medida',
        'valor',
        'sensor_id',
    ];

    public function sensores()
    {
        return $this->belongsTo(Sensor::class);
    }
}
