import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCambiarEstadoIncidenciaPage } from './modal-cambiar-estado-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCambiarEstadoIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCambiarEstadoIncidenciaPageRoutingModule {}
