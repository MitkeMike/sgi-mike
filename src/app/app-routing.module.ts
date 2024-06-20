import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    loadChildren: () => import('./pages/incidentes/incidentes.module').then( m => m.IncidentesPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Administrador', 'Técnico', 'Usuario', 'Supervisor', 'Encargado'] }
  },
  {
    path: 'diagnosticos/:ct_cod_incidencia', 
    loadChildren: () => import('./pages/diagnosticos/diagnosticos.module').then( m => m.DiagnosticosPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Técnico', 'Supervisor'] }
  },
  {
    path: 'modal-form-diagnosticos',
    loadChildren: () => import('./modal-form-diagnosticos/modal-form-diagnosticos.module').then( m => m.ModalFormDiagnosticosPageModule),
    canActivate: [AuthGuard],
    data: {roles: [ 'Técnico'] }
  },
  {
    path: 'asignar-incidencia/:ct_cod_incidencia',
    loadChildren: () => import('./pages/asignar-incidencia/asignar-incidencia.module').then( m => m.AsignarIncidenciaPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Encargado'] }
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./pages/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Administrador'] }
  },
  {
    path: 'mostrar-usuarios',
    loadChildren: () => import('./pages/mostrar-usuarios/mostrar-usuarios.module').then( m => m.MostrarUsuariosPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Administrador'] }
  },
  {
    path: 'modal-form-anadir-rol:cn_user_id',
    loadChildren: () => import('./modal-form-anadir-rol/modal-form-anadir-rol.module').then( m => m.ModalFormAnadirRolPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Administrador'] }
  },
  {
    path: 'modal-form-eliminar-rol:cn_user_id',
    loadChildren: () => import('./modal-form-eliminar-rol/modal-form-eliminar-rol.module').then( m => m.ModalFormEliminarRolPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Administrador'] }
  },
  {
    path: 'modal-cambiar-estado-incidencia',
    loadChildren: () => import('./modal-cambiar-estado-incidencia/modal-cambiar-estado-incidencia.module').then( m => m.ModalCambiarEstadoIncidenciaPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Técnico', 'Encargado'] }
  },
  {
    path: 'reportes-por-cargas-trabajo',
    loadChildren: () => import('./pages/reportes-por-cargas-trabajo/reportes-por-cargas-trabajo.module').then( m => m.ReportesPorCargasTrabajoPageModule),
    canActivate: [AuthGuard],
    data: {roles: ['Administrador', 'Supervisor'] }
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
