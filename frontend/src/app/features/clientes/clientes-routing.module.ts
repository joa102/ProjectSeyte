import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './containers/cliente-lista/cliente-lista.component';
import { ClienteFormularioComponent } from './containers/cliente-formulario/cliente-formulario.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClienteListaComponent
      },
      {
        path: 'form',
        component: ClienteFormularioComponent
      },
      {
        path: 'form/:id',
        component: ClienteFormularioComponent
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
  exports: [RouterModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class ClientesRoutingModule { }
