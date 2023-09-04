<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgramadorRiego;

class ProgramadorRiegoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programadorRiego = ProgramadorRiego::all();
        return $programadorRiego;
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
        $idCliente = $request->input('idCliente', $request->idCliente);
        $fieldName = $request->input('fieldName');
        $search = $request->input('search');

        $programadoresRiegoPaginados = ProgramadorRiego::orderBy('id', 'asc')
                                    ->where(function ($query) use ($idCliente, $fieldName, $search) {
                                        $query->where('programadores_riego.cliente_id', $idCliente);
                                        if ($fieldName && $search) {
                                            $query->where($fieldName, 'like', '%' . $search . '%');
                                        }
                                    })
                                    ->paginate($pageSize, ['*'], 'page', $page);

        return $programadoresRiegoPaginados;
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
            'modelo' => 'required',
            'numero_serie' => ['required', 'min:5', 'max:7'],
            'fecha_alta' => 'required',
            'fecha_ultima_conexion' => 'required',
            'cliente_id' => 'required'
        ]);
        try {
            $programadorRiego = new ProgramadorRiego();

            $programadorRiego->fill($request->all());

            $programadorRiego->save();

        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocurrio un problema al crear el programador de riego'], 400);
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
        $programadorRiego = ProgramadorRiego::destroy($id);
        return $programadorRiego;
    }

}
