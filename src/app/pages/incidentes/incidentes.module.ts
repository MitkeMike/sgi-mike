import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentesPageRoutingModule } from './incidentes-routing.module';

import { IncidentesPage } from './incidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentesPageRoutingModule
  ],
  declarations: [IncidentesPage]
})
export class IncidentesPageModule {}
