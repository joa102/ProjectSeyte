<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sensor;

class SensorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sensor = Sensor::all();
        return $sensor;
    }

    /**
     * Pagination a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function paginator(Request $request)
    {
        $pageSize = $request->input('pageSize', 5);
        $page = $request->input('page', 1);
        $idProgramadorRiego = $request->input('idProgramadorRiego', $request->idProgramadorRiego);
        $fieldName = $request->input('fieldName');
        $search = $request->input('search');

        $sensoresPaginados = Sensor::orderBy('id', 'asc')
                                    ->where(function ($query) use ($idProgramadorRiego, $fieldName, $search) {
                                        $query->where('sensores.programador_riego_id', $idProgramadorRiego);
                                        if ($fieldName && $search) {
                                            $query->where($fieldName, 'like', '%' . $search . '%');
                                        }
                                    })
                                    ->paginate($pageSize, ['*'], 'page', $page);

        return $sensoresPaginados;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_sonda' => 'required',
            'programador_riego_id' => 'required',
        ]);
        try {
            $sensor = new Sensor();

            $sensor->fill($request->all());

            $sensor->save();

        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocurrio un problema al crear el sensor'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $sensor = Sensor::destroy($id);
        return $sensor;
    }

}
