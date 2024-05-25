import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFormDiagnosticosPageRoutingModule } from './modal-form-diagnosticos-routing.module';

import { ModalFormDiagnosticosPage } from './modal-form-diagnosticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFormDiagnosticosPageRoutingModule
  ],
  declarations: [ModalFormDiagnosticosPage]
})
export class ModalFormDiagnosticosPageModule {}
