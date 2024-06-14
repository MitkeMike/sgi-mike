import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFormEliminarRolPageRoutingModule } from './modal-form-eliminar-rol-routing.module';

import { ModalFormEliminarRolPage } from './modal-form-eliminar-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFormEliminarRolPageRoutingModule
  ],
  declarations: [ModalFormEliminarRolPage]
})
export class ModalFormEliminarRolPageModule {}
