import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IncidentesService } from '../Services/incidentes.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-form-modal-incidentes',
  templateUrl: './form-modal-incidentes.component.html',
  styleUrls: ['./form-modal-incidentes.component.scss'],
})
export class FormModalIncidentesComponent implements OnInit {

  usuario: any;
  ct_titulo_incidencia: string = '';
  ct_descripcion_incidencia: string = '';
  ct_lugar_incidencia: string = '';
  img: File | null = null;
  showToast: boolean = false;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private incidentesServices: IncidentesService,
    private toastController: ToastController
  ) { }

  /**
   * ngOnInit - Hook del ciclo de vida que se ejecuta cuando el componente se inicializa.
   * Aquí se obtiene el token de autenticación y se recupera la información del usuario en sesión.
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
   * cerrar_modal - Cierra el modal actual.
   */
  cerrar_modal() {
    this.modalController.dismiss();
  }

  /**
   * onFileChange - Maneja el evento de cambio de archivo cuando se selecciona una imagen.
   * @param event - El evento de cambio del input de archivo.
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.img = file;
  
      // Actualiza el texto del span para mostrar el nombre del archivo
      const fileNameSpan = document.getElementById('fileName');
      if (fileNameSpan) {
        fileNameSpan.textContent = file.name;
      }
    }
  }

  /**
   * onSubmit - Maneja el envío del formulario para crear un incidente.
   * @param event - El evento de envío del formulario.
   */
  async onSubmit(event: Event) {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario
    if (!this.img) {
      console.error('Hace falta la imagen');
      return;
    }
    try {
      const response = await this.incidentesServices.crear_incidente(
        this.ct_titulo_incidencia,
        this.usuario.cn_user_id,
        this.ct_descripcion_incidencia,
        this.ct_lugar_incidencia,
        this.img
      );
      this.presentToast();
      this.cerrar_modal();
      window.location.reload();
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  }

  /**
   * presentToast - Muestra un toast con un mensaje de éxito.
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha creado con éxito',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
