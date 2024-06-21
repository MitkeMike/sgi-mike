import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../Services/auth.service';
import { IncidentesService } from '../Services/incidentes.service';

@Component({
  selector: 'app-modal-cambiar-estado-incidencia',
  templateUrl: './modal-cambiar-estado-incidencia.page.html',
  styleUrls: ['./modal-cambiar-estado-incidencia.page.scss'],
})
export class ModalCambiarEstadoIncidenciaPage implements OnInit {
  
  @Input() ct_cod_incidencia: string = '';
  estadoActual: number = 0;
  estadoSiguiente: number = 0;
  estados: any[] = [];
  usuario: any;

  constructor(
    private modalController: ModalController,
    private incidentesService: IncidentesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.authService.obtener_token();
    if (!token) {
      console.error('No hay un token válido');
    }
    this.authService.obtener_usuario();

    this.authService.usuario_en_sesion.subscribe(
      data => {
        if (data) {
          this.usuario = data;
          this.obtenerEstadoIncidencia();
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
  }

  async obtenerEstadoIncidencia() {
    try {
      const response = await this.incidentesService.obtener_estado_incidencia(this.ct_cod_incidencia);
      this.estadoActual = response.estadoActual;
      this.estadoSiguiente = response.estadoSiguiente;
    } catch (error) {
      console.error('Error al obtener el estado de la incidencia', error);
    }
  }

  async cambiarEstadoIncidencia() {
    try {
      const response = await this.incidentesService.cambiar_estado_incidencia(this.ct_cod_incidencia, String(this.estadoSiguiente), this.usuario.cn_user_id);
      if (response) {
        this.modalController.dismiss();
        window.location.reload();
      } else {
        console.error('Error al cambiar el estado de la incidencia');
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia', error);
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
