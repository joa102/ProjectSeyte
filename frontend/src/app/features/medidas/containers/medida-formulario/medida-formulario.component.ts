import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../shared/dialog/dialog.component";
import { MedidaService } from '../../services/medida.service';

@Component({
  selector: 'app-medida-formulario',
  templateUrl: './medida-formulario.component.html',
  styleUrls: ['./medida-formulario.component.scss']
})
export class MedidaFormularioComponent implements OnInit {

  medida: any = '';
  forma!: FormGroup;
  public status: boolean;
  pickerFHM!:Date;
  fecha_hora_medida!:String;
  sensor_id!: number;

  constructor(
    private fb: FormBuilder,
    private peticionesService: MedidaService,
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
      fecha_hora_medida : [null, Validators.required],
      valor : ['', [ Validators.required ] ]
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

      this.sensor_id  = parseInt(this.router.url.split('/')[2], 10);

      this.pickerFHM = this.forma.get('fecha_hora_medida')?.value;

      this.forma.value.fecha_hora_medida = this.fecha_hora_medida = this.pickerFHM.getFullYear() + '-' + (this.pickerFHM.getMonth() + 1) + '-' + this.pickerFHM.getDate();

      this.medida = this.forma.value;
      this.medida.sensor_id = this.sensor_id;

      this.peticionesService.addMedida(this.medida).subscribe( res => {

          this.status =true;

          const dialogRef = this.dialog.open(DialogComponent, {
            data: {title: 'Medida creado correctamente', icon: "check_circle_outline", class: "text-success"},
          });
          dialogRef.afterClosed().subscribe();

          this.router.navigate(['/medidas/'+this.sensor_id])
      },
      error => {

        const dialogRef = this.dialog.open(DialogComponent, {
          data: {title: 'Error al crear medida', text: 'Faltan campos obligatorios por insertar', icon: "highlight_off", class: "text-danger"},
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
