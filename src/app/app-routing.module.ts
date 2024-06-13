import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'incidentes',
    loadChildren: () => import('./pages/incidentes/incidentes.module').then( m => m.IncidentesPageModule)
  },
  {
    path: 'diagnosticos/:ct_cod_incidencia', 
    loadChildren: () => import('./pages/diagnosticos/diagnosticos.module').then( m => m.DiagnosticosPageModule)
  },
  {
    path: 'modal-form-diagnosticos',
    loadChildren: () => import('./modal-form-diagnosticos/modal-form-diagnosticos.module').then( m => m.ModalFormDiagnosticosPageModule)
  },
  {
    path: 'asignar-incidencia/:ct_cod_incidencia',
    loadChildren: () => import('./pages/asignar-incidencia/asignar-incidencia.module').then( m => m.AsignarIncidenciaPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
