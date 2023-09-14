import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../shared/dialog/dialog.component";

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.scss']
})
export class ClienteFormularioComponent implements OnInit {

  forma!: FormGroup;
  cliente: any = '';
  idCliente!: number;
  public status: boolean;
  dateFIC!:Date;
  dateFEC!:Date;
  fechaInicioContrato!:String;
  fechaExpiracionContrato!:String;
  public titulo: string = "Crear cliente";
  public boton: string = "Crear";

  constructor(
    private fb: FormBuilder,
    private peticionesService: ClienteService,
    private router:Router,
    public dialog: MatDialog
  ) {
    this.status = false;
    this.idCliente = parseInt(this.router.url.split('/')[3], 10);
  }

  ngOnInit(): void {
    this.createForm();
    if(this.idCliente){
      this.getCliente();
      this.createFormUpdate();
      this.titulo = "Editar cliente";
      this.boton = "Editar";
    }
  }

  createForm() {
    this.forma = this.fb.group({
      codigo : ['', [ Validators.required ] ],
      razon_social : ['', [ Validators.required ] ],
      cif : ['', Validators.required],
      direccion : ['', Validators.required ],
      municipio: ['', Validators.required],
      provincia: ['', Validators.required],
      fecha_inicio_contrato : [null, Validators.required],
      fecha_expiracion_contrato : [null, Validators.required]
    });
  }

  createFormUpdate() {
    this.forma = this.fb.group({
      id : ['', [ Validators.required ] ],
      codigo : ['', [ Validators.required ] ],
      razon_social : ['', [ Validators.required ] ],
      cif : ['', Validators.required],
      direccion : ['', Validators.required ],
      municipio: ['', Validators.required],
      provincia: ['', Validators.required],
      fecha_inicio_contrato : [null, Validators.required],
      fecha_expiracion_contrato : [null, Validators.required]
    });
  }

  guardar() {
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.dateFIC = this.forma.get('fecha_inicio_contrato')?.value;
    this.dateFEC = this.forma.get('fecha_expiracion_contrato')?.value;

    const formatoFechaRegex = /^\d{4}\-\d{2}\-\d{2}$/;

    if(formatoFechaRegex.test(this.dateFIC.toString()) == false){
      this.forma.value.fecha_inicio_contrato = this.fechaInicioContrato = this.dateFIC.getFullYear() + '-' + (this.dateFIC.getMonth() + 1) + '-' + this.dateFIC.getDate();
    } else {
      this.forma.value.fecha_inicio_contrato = this.dateFIC;
    }
    if(formatoFechaRegex.test(this.dateFEC.toString()) == false){
      this.forma.value.fecha_expiracion_contrato = this.fechaExpiracionContrato = this.dateFEC.getFullYear() + '-' + (this.dateFEC.getMonth() + 1) + '-' + this.dateFEC.getDate();
    } else {
      this.forma.value.fecha_expiracion_contrato = this.dateFEC;
    }

    if(!this.idCliente){
      this.add();
    } else {
      this.update();
    }

  }

  add() {
    this.peticionesService.addCliente(this.forma.value).subscribe( res => {
      this.status =true;

      const dialogRef = this.dialog.open(DialogComponent, {
        data: {title: 'Cliente creado correctamente', icon: "check_circle_outline", class: "text-success"},
      });
      dialogRef.afterClosed().subscribe();

      this.router.navigate(['/clientes'])
    },
    error => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {title: 'Error al crear cliente', text: 'Faltan campos obligatorios por insertar o el código introducido está repetido en la base de datos', icon: "highlight_off", class: "text-danger"},
      });
      dialogRef.afterClosed().subscribe();

      Object.entries(error.error.errors).forEach(([inputName,error])=>{
          this.forma.get(inputName)?.setErrors({serverError:error})
        }
      );
    });
  }

  update() {
    this.peticionesService.updateCliente(this.forma.value).subscribe( res => {
      this.status =true;

      const dialogRef = this.dialog.open(DialogComponent, {
        data: {title: 'Cliente editado correctamente', icon: "check_circle_outline", class: "text-success"},
      });
      dialogRef.afterClosed().subscribe();

      this.router.navigate(['/clientes'])
    },
    error => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {title: 'Error al crear cliente', text: 'Faltan campos obligatorios por insertar o el código introducido está repetido en la base de datos', icon: "highlight_off", class: "text-danger"},
      });
      dialogRef.afterClosed().subscribe();

      Object.entries(error.error.errors).forEach(([inputName,error])=>{
          this.forma.get(inputName)?.setErrors({serverError:error})
        }
      );
    });
  }

  getError(inputName:string, errorCode:string){
    const formControl = this.forma.get(inputName);
    if(!formControl) {
      return null;
    }
    const error = formControl.errors && formControl.errors.hasOwnProperty(errorCode) ? formControl.errors[errorCode] : null;
    return error;
  }

  getCliente(){
    this.peticionesService.getCliente(this.idCliente).subscribe(
      (data) => {
        this.cliente = data;

        this.forma.patchValue({
          id: this.cliente.id,
          codigo: this.cliente.codigo,
          razon_social: this.cliente.razon_social,
          cif: this.cliente.cif,
          direccion: this.cliente.direccion,
          municipio: this.cliente.municipio,
          provincia: this.cliente.provincia,
          fecha_inicio_contrato: this.cliente.fecha_inicio_contrato,
          fecha_expiracion_contrato: this.cliente.fecha_expiracion_contrato
        });
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
