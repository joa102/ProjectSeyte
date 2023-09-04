export class ProgramadorRiego{
  constructor(
    public id: string,
    public modelo: string,
    public numero_serie: string,
    public fecha_alta: Date,
    public fecha_ultima_conexion: Date,
    public cliente_id: number,
  ){

  }
}
