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

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * Obtiene el token del usuario y luego obtiene al usuario en sesión.
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
   * crear_usuario - Método para crear un nuevo usuario.
   * Llama al servicio adminService para crear un nuevo usuario con los datos del formulario.
   * Muestra un mensaje toast en caso de éxito y resetea el formulario.
   */
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

  /**
   * resetForm - Método para resetear el formulario de creación de usuario.
   */
  resetForm() {
    this.ct_nombre = '';
    this.ct_cedula = '';
    this.ct_puesto = '';
    this.ct_correo = '';
    this.ct_password = '';
  }

  /**
   * presentToast - Método para mostrar un mensaje toast.
   * @param message - El mensaje a mostrar en el toast.
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha registrado un nuevo usuario con éxito',
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

  /**
   * volver - Método para navegar de vuelta a la página de incidentes.
   */
  volver() {
    this.router.navigate(['/incidentes']);
  }
}
