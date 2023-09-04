import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./features/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'programadoresRiego',
    loadChildren: () => import('./features/programadores-riego/programadores-riego.module').then(m => m.ProgramadoresRiegoModule)
  },
  {
    path: 'sensores',
    loadChildren: () => import('./features/sensores/sensores.module').then(m => m.SensoresModule)
  },
  {
    path: 'medidas',
    loadChildren: () => import('./features/medidas/medidas.module').then(m => m.MedidasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
