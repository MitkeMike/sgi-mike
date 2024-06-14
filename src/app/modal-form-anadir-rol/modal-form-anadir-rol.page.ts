import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-modal-form-anadir-rol',
  templateUrl: './modal-form-anadir-rol.page.html',
  styleUrls: ['./modal-form-anadir-rol.page.scss'],
})
export class ModalFormAnadirRolPage implements OnInit {

  roles: any[] = [];
  roles_seleccionados: any[] = [];
  cn_user_id: number = 0;

  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.cn_user_id = this.navParams.get('cn_user_id');  
    this.obtener_roles();
  }

  async obtener_roles() {
    this.roles = await this.adminService.obtener_roles();
    if (this.roles) {
      console.log('Roles obtenidos', this.roles);
    } else {
      console.error('Error al obtener los roles');
    }
  }

  async anadir_roles() {
    console.log('Roles seleccionados', this.roles_seleccionados);
    const roles = this.roles_seleccionados;
    try {
      const response = await this.adminService.asignar_roles(this.cn_user_id, roles);
      if (response) {
        console.log('Roles añadidos correctamente');
      } else {
        console.error('Error al añadir los roles');
      }
    } catch (error) {
      console.error('Error al añadir los roles', error);
    }
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
