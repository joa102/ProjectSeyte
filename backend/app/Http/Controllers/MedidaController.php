<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medida;

class MedidaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medida = Medida::all();
        return $medida;
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
        $idSensor = $request->input('idSensor', $request->idSensor);
        $fieldName = $request->input('fieldName');
        $search = $request->input('search');

        $medidasPaginadas = Medida::orderBy('id', 'asc')
                                    ->where(function ($query) use ($idSensor, $fieldName, $search) {
                                        $query->where('medidas.sensor_id', $idSensor);
                                        if ($fieldName && $search) {
                                            $query->where($fieldName, 'like', '%' . $search . '%');
                                        }
                                    })
                                    ->paginate($pageSize, ['*'], 'page', $page);

        return $medidasPaginadas;
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
            'fecha_hora_medida' => 'required',
            'valor' => 'required',
            'sensor_id' => 'required',
        ]);
        try {
            $medida = new Medida();

            $medida->fill($request->all());

            $medida->save();

        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocurrio un problema al crear la medida'], 400);
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
        $medida = Medida::destroy($id);
        return $medida;
    }
}
