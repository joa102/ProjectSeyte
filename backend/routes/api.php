<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProgramadorRiegoController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\MedidaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=>'clientes'], function () {
    Route::get('/',[ ClienteController::class, 'paginator']);
    Route::get('/{cliente}',[ ClienteController::class, 'show']);
    Route::post('/',[ ClienteController::class, 'store']);
    Route::put('/{cliente}',[ ClienteController::class, 'update']);
    Route::delete('/{cliente}',[ ClienteController::class, 'destroy']);
});

Route::group(['prefix'=>'programadoresRiego'], function () {
    Route::get('/',[ ProgramadorRiegoController::class, 'index']);
    Route::get('/{idCliente}',[ ProgramadorRiegoController::class, 'paginator']);
    Route::post('/',[ ProgramadorRiegoController::class, 'store']);
    Route::delete('/{programadorRiego}',[ ProgramadorRiegoController::class, 'destroy']);
});

Route::group(['prefix'=>'sensores'], function () {
    Route::get('/',[ SensorController::class, 'index']);
    Route::get('/{programadorRiego}',[ SensorController::class, 'paginator']);
    Route::post('/',[ SensorController::class, 'store']);
    Route::delete('/{sensor}',[ SensorController::class, 'destroy']);
});

Route::group(['prefix'=>'medidas'], function () {
    Route::get('/',[ MedidaController::class, 'index']);
    Route::get('/{sensor}',[ MedidaController::class, 'paginator']);
    Route::post('/',[ MedidaController::class, 'store']);
    Route::delete('/{medida}',[ MedidaController::class, 'destroy']);
});
