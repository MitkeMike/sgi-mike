import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesPorCargasTrabajoPage } from './reportes-por-cargas-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesPorCargasTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesPorCargasTrabajoPageRoutingModule {}
