import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IncidentesService } from '../Services/incidentes.service';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-form-modal-incidentes',
  templateUrl: './form-modal-incidentes.component.html',
  styleUrls: ['./form-modal-incidentes.component.scss'],
})
export class FormModalIncidentesComponent  implements OnInit {

  usuario: any;
  ct_titulo_incidencia: string = '';
  ct_descripcion_incidencia: string = '';
  ct_lugar_incidencia: string = '';

  constructor(private authService: AuthService, private modalController: ModalController, private incidentesServices: IncidentesService) { }

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
  }
  
  cerrar_modal() {
    this.modalController.dismiss();
  }

  async onSubmit(event: Event) {
    try {
      const response = await this.incidentesServices.crear_incidente(this.ct_titulo_incidencia,
        this.usuario.cn_user_id,
        this.ct_descripcion_incidencia, 
        this.ct_lugar_incidencia);
      console.log(response);
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
    //Hace falta llenar campos.
    this.modalController.dismiss();
  }

}
