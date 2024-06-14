import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFormEliminarRolPage } from './modal-form-eliminar-rol.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormEliminarRolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFormEliminarRolPageRoutingModule {}
