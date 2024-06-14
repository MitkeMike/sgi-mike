import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFormAnadirRolPage } from './modal-form-anadir-rol.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormAnadirRolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFormAnadirRolPageRoutingModule {}
