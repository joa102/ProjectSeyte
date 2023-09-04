import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorListaComponent } from './containers/sensor-lista/sensor-lista.component';
import { SensorFormularioComponent } from './containers/sensor-formulario/sensor-formulario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: SensorListaComponent
      },
      {
        path: ':id/form',
        component: SensorFormularioComponent
      },
      {
        path: 'form/:id',
        component: SensorFormularioComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensoresRoutingModule { }
