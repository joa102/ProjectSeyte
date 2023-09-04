export class Cliente{
  constructor(
    public id: string,
    public codigo: string,
    public razon_social: string,
    public cif: string,
    public direccion: string,
    public municipio: string,
    public provincia: string,
    public fecha_inicio_contrato: Date,
    public fecha_expiracion_contrato: Date
  ){

  }
}
