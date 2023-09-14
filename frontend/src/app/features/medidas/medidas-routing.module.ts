import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedidaListaComponent } from './containers/medida-lista/medida-lista.component';
import { MedidaFormularioComponent } from './containers/medida-formulario/medida-formulario.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: MedidaListaComponent
      },
      {
        path: ':id/form',
        component: MedidaFormularioComponent
      },
      {
        path: 'form/:id',
        component: MedidaFormularioComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MedidasRoutingModule { }
