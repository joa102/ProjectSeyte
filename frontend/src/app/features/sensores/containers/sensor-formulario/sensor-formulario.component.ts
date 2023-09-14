import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../shared/dialog/dialog.component";

import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-sensor-formulario',
  templateUrl: './sensor-formulario.component.html',
  styleUrls: ['./sensor-formulario.component.scss']
})
export class SensorFormularioComponent implements OnInit {

  sensor: any = '';
  forma!: FormGroup;
  public status: boolean;
  idProgramadorRiego!: number;

  constructor(
    private fb: FormBuilder,
    private peticionesService: SensorService,
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
      nombre_sonda : ['', [ Validators.required ] ]
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

    this.idProgramadorRiego = parseInt(this.router.url.split('/')[2], 10);

    this.sensor = this.forma.value;
    this.sensor.programador_riego_id = this.idProgramadorRiego;

    this.peticionesService.addSensor(this.sensor).subscribe( res => {
        this.status =true;

        const dialogRef = this.dialog.open(DialogComponent, {
          data: {title: 'Sensor creado correctamente', icon: "check_circle_outline", class: "text-success"},
        });
        dialogRef.afterClosed().subscribe();

        this.router.navigate(['/sensores/'+this.idProgramadorRiego])
    },
    error => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {title: 'Error al crear sensor', text: 'Faltan campos obligatorios por insertar', icon: "highlight_off", class: "text-danger"},
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
