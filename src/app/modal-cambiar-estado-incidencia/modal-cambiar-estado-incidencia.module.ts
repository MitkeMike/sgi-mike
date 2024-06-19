import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCambiarEstadoIncidenciaPageRoutingModule } from './modal-cambiar-estado-incidencia-routing.module';

import { ModalCambiarEstadoIncidenciaPage } from './modal-cambiar-estado-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCambiarEstadoIncidenciaPageRoutingModule
  ],
  declarations: [ModalCambiarEstadoIncidenciaPage]
})
export class ModalCambiarEstadoIncidenciaPageModule {}
