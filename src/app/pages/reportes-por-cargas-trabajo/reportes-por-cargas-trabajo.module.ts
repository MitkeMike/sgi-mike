import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesPorCargasTrabajoPageRoutingModule } from './reportes-por-cargas-trabajo-routing.module';

import { ReportesPorCargasTrabajoPage } from './reportes-por-cargas-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesPorCargasTrabajoPageRoutingModule
  ],
  declarations: [ReportesPorCargasTrabajoPage]
})
export class ReportesPorCargasTrabajoPageModule {}
