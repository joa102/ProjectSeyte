<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $clientes = Cliente::all();
        return $clientes;
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
        $fieldsName = $request->input('fieldName');
        $fieldName1 = '';
        $fieldName2 = '';
        $search = $request->input('search');

        if ($fieldsName) {
            $result  = explode(',', $fieldsName);
            $fieldName1 = $result[0];
            $fieldName2 = $result[1];
        }

        $clientesPaginados = Cliente::orderBy('id', 'asc')
                                    ->where(function ($query) use ($fieldName1, $fieldName2, $search) {
                                        if ($fieldName1 && $fieldName2 && $search) {
                                            $query->where($fieldName1, 'like', '%' . $search . '%')
                                                ->orWhere($fieldName2, 'like', '%' . $search . '%');
                                        }
                                    })
                                    ->paginate($pageSize, ['*'], 'page', $page);

        return $clientesPaginados;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->merge([
            'user_id' => 3,
        ]);
        $request->validate([
            'codigo' => 'required',
            'razon_social' => 'required',
            'cif' => ['required', 'min:9', 'max:12'],
            'direccion' => 'required',
            'municipio' => 'required',
            'provincia' => 'required',
            'fecha_inicio_contrato' => 'required',
            'fecha_expiracion_contrato' => 'required',
        ]);
        try {
            $cliente = new Cliente();

            $cliente->fill($request->all());

            $cliente->save();

        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocurrio un problema al crear el cliente'], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cliente = Cliente::select('clientes.*')
            ->where('clientes.id',$id)
            ->first();

        return $cliente;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'codigo' => 'required',
            'razon_social' => 'required',
            'cif' => ['required', 'min:9', 'max:12'],
            'direccion' => 'required',
            'municipio' => 'required',
            'provincia' => 'required',
            'fecha_inicio_contrato' => 'required',
            'fecha_expiracion_contrato' => 'required',
        ]);
        try {
            $cliente = Cliente::findOrFail($id);

            $cliente->fill($request->all());
            $cliente->save();

            return $cliente;

        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocurrio un problema al editar el cliente'], 400);
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
        $cliente = Cliente::destroy($id);
        return $cliente;
    }

    protected function validateCliente(){

        return request()->validate([
            'codigo' => 'required',
            'razon_social' => 'required',
            'cif' => ['required', 'min:9', 'max:12'],
            'direccion' => 'required',
            'municipio' => 'required',
            'provincia' => 'required',
            'fecha_inicio_contrato' => 'required',
            'fecha_expiracion_contrato' => 'required'
        ]);

    }

}
