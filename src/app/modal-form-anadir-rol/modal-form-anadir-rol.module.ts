import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFormAnadirRolPageRoutingModule } from './modal-form-anadir-rol-routing.module';

import { ModalFormAnadirRolPage } from './modal-form-anadir-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFormAnadirRolPageRoutingModule
  ],
  declarations: [ModalFormAnadirRolPage]
})
export class ModalFormAnadirRolPageModule {}
