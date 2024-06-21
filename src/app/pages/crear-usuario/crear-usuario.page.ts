import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  usuario: any;
  ct_nombre: string = '';
  ct_cedula: string = '';
  ct_puesto: string = '';
  ct_correo: string = '';
  ct_password: string = '';
  showToast: boolean = false;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private toastController: ToastController,
    private router: Router
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
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
  }

  async crear_usuario() {
    try {
      const response = await this.adminService.crear_usuario(
        this.ct_nombre,
        this.ct_cedula,
        this.ct_puesto,
        this.ct_correo,
        this.ct_password
      );
      if (response) {
        this.resetForm();
        this.presentToast();
      } else {
        console.error('No se pudo crear el usuario.');
      }
    } catch (error) {
      console.error('Error al crear el usuario', error);
    }
  }

  resetForm() {
    this.ct_nombre = '';
    this.ct_cedula = '';
    this.ct_puesto = '';
    this.ct_correo = '';
    this.ct_password = '';
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha registrado un nuevo usuario con éxito',
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

  volver() {
    this.router.navigate(['/incidentes']);
  }
}
