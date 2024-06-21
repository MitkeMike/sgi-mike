import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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
          this.cn_user_id = this.navParams.get('cn_user_id');  
          this.obtener_roles();

        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
  }

  async obtener_roles() {
    this.roles = await this.adminService.obtener_roles();
    if (this.roles) {
    } else {
      console.error('Error al obtener los roles');
    }
  }

  async anadir_roles() {
    const roles = this.roles_seleccionados;
    try {
      const response = await this.adminService.asignar_roles(this.cn_user_id, roles);
      if (response) {
      } else {
        console.error('Error al añadir los roles');
      }
    } catch (error) {
      console.error('Error al añadir los roles', error);
    }
    this.cerrarModal();
    window.location.reload();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
