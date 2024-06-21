import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../Services/auth.service';
import { IncidentesService } from '../Services/incidentes.service';

@Component({
  selector: 'app-modal-cambiar-estado-incidencia',
  templateUrl: './modal-cambiar-estado-incidencia.page.html',
  styleUrls: ['./modal-cambiar-estado-incidencia.page.scss'],
})
export class ModalCambiarEstadoIncidenciaPage implements OnInit {

  @Input() ct_cod_incidencia: string = ''; // Recibe el código de la incidencia como input
  estadoActual: number = 0;
  estadoSiguiente: number = 0;
  estados: any[] = [];
  usuario: any;

  constructor(
    private modalController: ModalController,
    private incidentesService: IncidentesService,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * Verifica si hay un token válido y obtiene el usuario en sesión.
   */
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
          this.obtenerEstadoIncidencia(); // Obtiene el estado de la incidencia si hay un usuario en sesión
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
  }

  /**
   * obtenerEstadoIncidencia - Método para obtener el estado actual y siguiente de la incidencia.
   */
  async obtenerEstadoIncidencia() {
    try {
      const response = await this.incidentesService.obtener_estado_incidencia(this.ct_cod_incidencia);
      this.estadoActual = response.estadoActual;
      this.estadoSiguiente = response.estadoSiguiente;
    } catch (error) {
      console.error('Error al obtener el estado de la incidencia', error);
    }
  }

  /**
   * cambiarEstadoIncidencia - Método para cambiar el estado de la incidencia.
   * Muestra un toast y recarga la página si el cambio de estado es exitoso.
   */
  async cambiarEstadoIncidencia() {
    try {
      const response = await this.incidentesService.cambiar_estado_incidencia(this.ct_cod_incidencia, String(this.estadoSiguiente), this.usuario.cn_user_id);
      if (response) {
        this.presentToast('Se ha cambiado el estado de manera exitosa');
        this.modalController.dismiss();
        window.location.reload();
      } else {
        console.error('Error al cambiar el estado de la incidencia');
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia', error);
    }
  }

  /**
   * presentToast - Método para mostrar un mensaje toast.
   * @param message - El mensaje a mostrar en el toast.
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  /**
   * cerrarModal - Método para cerrar el modal.
   */
  cerrarModal() {
    this.modalController.dismiss();
  }
}
