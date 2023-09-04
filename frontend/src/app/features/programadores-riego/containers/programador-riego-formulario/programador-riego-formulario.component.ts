import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../shared/dialog/dialog.component";
import { ProgramadorRiegoService } from '../../services/programador-riego.service';

@Component({
  selector: 'app-programador-riego-formulario',
  templateUrl: './programador-riego-formulario.component.html',
  styleUrls: ['./programador-riego-formulario.component.scss']
})
export class ProgramadorRiegoFormularioComponent implements OnInit {

  programadorRiego: any = '';
  forma!: FormGroup;
  public status: boolean;
  dateFA!:Date;
  dateFUC!:Date;
  fecha_alta!:String;
  fecha_ultima_conexion!:String;
  idCliente!: number;

  constructor(
    private fb: FormBuilder,
    private peticionesService: ProgramadorRiegoService,
    private router:Router,
    public dialog: MatDialog
  ) {
    this.status = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm () {
    this.forma = this.fb.group({
      modelo : ['', [ Validators.required ] ],
      numero_serie : ['', [ Validators.required ] ],
      fecha_alta : [null, Validators.required],
      fecha_ultima_conexion : [null, Validators.required]
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

    this.idCliente = parseInt(this.router.url.split('/')[2], 10);

    this.dateFA = this.forma.get('fecha_alta')?.value;
    this.dateFUC = this.forma.get('fecha_ultima_conexion')?.value;

    this.forma.value.fecha_alta = this.fecha_alta = this.dateFA.getFullYear() + '-' + (this.dateFA.getMonth() + 1) + '-' + this.dateFA.getDate();
    this.forma.value.fecha_ultima_conexion = this.fecha_ultima_conexion = this.dateFUC.getFullYear() + '-' + (this.dateFUC.getMonth() + 1) + '-' + this.dateFUC.getDate();

    this.programadorRiego = this.forma.value;
    this.programadorRiego.cliente_id = this.idCliente;

    this.peticionesService.addProgramadorRiego(this.programadorRiego).subscribe( res => {

        this.status =true;

        const dialogRef = this.dialog.open(DialogComponent, {
          data: {title: 'Progranador de riego creado correctamente', icon: "check_circle_outline", class: "text-success"},
        });
        dialogRef.afterClosed().subscribe();

        this.router.navigate(['/programadoresRiego/'+this.idCliente])
    },
    error => {

      const dialogRef = this.dialog.open(DialogComponent, {
        data: {title: 'Error al crear programador de riego', text: 'Faltan campos obligatorios por insertar o el número de serie introducido está repetido en la base de datos', icon: "highlight_off", class: "text-danger"},
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

}
