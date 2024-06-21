import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../Services/auth.service';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-modal-form-eliminar-rol',
  templateUrl: './modal-form-eliminar-rol.page.html',
  styleUrls: ['./modal-form-eliminar-rol.page.scss'],
})
export class ModalFormEliminarRolPage implements OnInit {

  usuario: any;
  cn_user_id: number = 0;
  roles_usuario: any[] = [];
  roles_seleccionados: any[] = [];

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private adminService: AdminService,
    private navParams: NavParams,
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
          this.obtener_roles_usuario();
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
   * obtener_roles_usuario - Método para obtener los roles del usuario.
   * Llama al servicio adminService para obtener los roles del usuario especificado.
   */
  async obtener_roles_usuario() {
    this.roles_usuario = await this.adminService.roles_por_usuario(this.cn_user_id);
    if (this.roles_usuario) {
    } else {
      console.error('Error al obtener los roles');
    }
  }

  /**
   * eliminar_roles - Método para eliminar los roles seleccionados del usuario.
   * Llama al servicio adminService para eliminar los roles del usuario especificado y muestra un toast en caso de éxito.
   */
  async eliminar_roles() {    
    const response = await this.adminService.eliminar_roles(this.cn_user_id, this.roles_seleccionados);
    
    if (response) {
      this.presentToast('Se ha eliminado con éxito el rol');
      this.cerrarModal();
      window.location.reload();
    } else {
      console.error('Error al eliminar los roles');
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
