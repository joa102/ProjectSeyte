export class Medida{
  constructor(
    public id: string,
    public nombre_sonda: string,
    public fecha_hora_medida: Date,
    public valor: number,
    public sonda_id: number,
  ){

  }
}
