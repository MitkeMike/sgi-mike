import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarIncidenciaPageRoutingModule } from './asignar-incidencia-routing.module';

import { AsignarIncidenciaPage } from './asignar-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarIncidenciaPageRoutingModule
  ],
  declarations: [AsignarIncidenciaPage]
})
export class AsignarIncidenciaPageModule {}
