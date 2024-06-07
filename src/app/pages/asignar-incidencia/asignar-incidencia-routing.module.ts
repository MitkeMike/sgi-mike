import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarIncidenciaPage } from './asignar-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarIncidenciaPageRoutingModule {}
