import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFormDiagnosticosPage } from './modal-form-diagnosticos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormDiagnosticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFormDiagnosticosPageRoutingModule {}
