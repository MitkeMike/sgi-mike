import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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
    private navParams: NavParams
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
          this.obtener_roles_usuario();
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

  async obtener_roles_usuario() {
    this.roles_usuario = await this.adminService.roles_por_usuario(this.cn_user_id);
    if (this.roles_usuario) {
      console.log('Roles obtenidos', this.roles_usuario);
    } else {
      console.error('Error al obtener los roles');
    }
  }

  async eliminar_roles() {    
    const response = await this.adminService.eliminar_roles(this.cn_user_id, this.roles_seleccionados);
    
    if (response) {
      console.log('Roles eliminados', response);
      this.cerrarModal();
    } else {
      console.error('Error al eliminar los roles');
    }
  }


  cerrarModal() {
    this.modalController.dismiss();
  }
}
