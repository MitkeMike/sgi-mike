import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticosPageRoutingModule } from './diagnosticos-routing.module';

import { DiagnosticosPage } from './diagnosticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiagnosticosPageRoutingModule
  ],
  declarations: [DiagnosticosPage]
})
export class DiagnosticosPageModule {}
