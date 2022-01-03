<?php

namespace App\Models\Ventas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroLlamadas extends Model
{
    use HasFactory;
    protected $table = "registrollamadas";

    protected $primaryKey = "id_rll";

    protected $fillable = [
        'consecutivo_rll',
        'cliente_rll',
        'motivollamada_rll',
        'pedientellamada_rll',
        'comentarios_rll',
        'fecha_rll',
        'estadollamada_rll'
    ];

    public $timestamps = false;
}
