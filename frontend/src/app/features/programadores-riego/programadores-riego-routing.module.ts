import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramadorRiegoListaComponent } from './containers/programador-riego-lista/programador-riego-lista.component';
import { ProgramadorRiegoFormularioComponent } from './containers/programador-riego-formulario/programador-riego-formulario.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: ProgramadorRiegoListaComponent
      },
      {
        path: ':id/form',
        component: ProgramadorRiegoFormularioComponent
      },
      {
        path: 'form/:id',
        component: ProgramadorRiegoFormularioComponent
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
export class ProgramadoresRiegoRoutingModule { }
