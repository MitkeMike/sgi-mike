import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AdminService } from '../Services/admin.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-modal-form-anadir-rol',
  templateUrl: './modal-form-anadir-rol.page.html',
  styleUrls: ['./modal-form-anadir-rol.page.scss'],
})
export class ModalFormAnadirRolPage implements OnInit {

  usuario: any;
  roles: any[] = [];
  roles_seleccionados: any[] = [];
  cn_user_id: number = 0;

  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private navParams: NavParams,
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
          this.cn_user_id = this.navParams.get('cn_user_id');  
          this.obtener_roles(); // Obtiene los roles disponibles
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
   * obtener_roles - Método para obtener los roles disponibles.
   */
  async obtener_roles() {
    this.roles = await this.adminService.obtener_roles();
    if (!this.roles) {
      console.error('Error al obtener los roles');
    }
  }

  /**
   * anadir_roles - Método para añadir roles al usuario.
   * Muestra un toast si la operación es exitosa y recarga la página.
   */
  async anadir_roles() {
    const roles = this.roles_seleccionados;
    try {
      const response = await this.adminService.asignar_roles(this.cn_user_id, roles);
      if (response) {
        this.presentToast('Se ha añadido el rol con éxito');
      } else {
        console.error('Error al añadir los roles');
      }
    } catch (error) {
      console.error('Error al añadir los roles', error);
    }
    this.cerrarModal();
    window.location.reload();
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
