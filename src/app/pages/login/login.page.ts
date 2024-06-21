import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ct_usuario: any;
  ct_correo: string = '';
  ct_password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) {}

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * No realiza ninguna acción adicional en este caso.
   */
  ngOnInit(): void {}

  /**
   * login - Método para manejar el inicio de sesión.
   * Envía las credenciales del usuario al servicio de autenticación y maneja la respuesta.
   * @param event - Evento de envío del formulario.
   */
  async login(event: Event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario
    try {
      const response = await this.authService.login(this.ct_correo, this.ct_password);

      if (response && response.message === 'Inicio de sesión exitoso') { // Verifica el mensaje de éxito
        await this.authService.obtener_usuario_sync(); // Obtener el usuario en sesión de manera síncrona
        // Redireccionar a la página de incidentes
        this.router.navigate(['/incidentes']);
        this.presentToast('Inicio de sesión exitoso', 'success'); // Mensaje verde
      } else {
        this.presentToast('Usuario Incorrecto, intente nuevamente', 'danger'); // Mensaje rojo
        console.error('Correo o contraseña incorrectos');
      }
    } catch (error) {
      this.presentToast('Usuario o Contraseña Incorrecto, intente nuevamente', 'danger'); // Mensaje rojo
      console.error('No se pudo iniciar sesión', error);
    }
  }

  /**
   * presentToast - Método para mostrar un mensaje de toast.
   * @param message - Mensaje a mostrar en el toast.
   * @param color - Color del toast.
   */
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color // Añadir color
    });
    toast.present();
  }

}
