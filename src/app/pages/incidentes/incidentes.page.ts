import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { IncidentesService } from 'src/app/Services/incidentes.service';
import { ModalController } from '@ionic/angular';
import { FormModalIncidentesComponent } from 'src/app/form-modal-incidentes/form-modal-incidentes.component';
@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.page.html',
  styleUrls: ['./incidentes.page.scss'],
})
export class IncidentesPage implements OnInit {

  usuario: any;
  incidentes: any[] = [];
  constructor(
    private authService: AuthService, 
    private incidentesServices: IncidentesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    const token = this.authService.obtener_token();
    if(!token) {
      console.error('No hay un token válido');
    }
    this.authService.obtener_usuario();

    this.authService.usuario_en_sesion.subscribe(
      data => {
        if(data) {
          this.usuario = data;
          console.log('Usuario en sesión:', data);
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
    this.obtener_incidentes();
  }

  async obtener_incidentes() {
    try {
      const response = await this.incidentesServices.obtener_incidentes();
      this.incidentes = response;
      console.log('Incidentes obtenidos:', response);
    } catch (error) {
      console.error('Error al obtener los incidentes', error);
    }
  }

  async abrir_modal() {
    const modal = await this.modalController.create({
      component: FormModalIncidentesComponent
    });
    await modal.present();
  }

}
