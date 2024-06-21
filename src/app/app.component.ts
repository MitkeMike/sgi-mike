import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userRoles: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Suscribirse al usuario en sesión y obtener roles si hay un usuario
    this.authService.usuario_en_sesion.subscribe(async usuario => {
      if (usuario) {
        const roles = await this.authService.obtener_roles_usuario_sesion();
        this.userRoles = roles.map((role: any) => role.ct_descripcion);
      }
    });

    // Comprobar si el usuario está logueado y obtener información del usuario
    if (this.authService.isLoggedIn()) {
      this.authService.obtener_usuario();
    }
  }

  /**
   * Verifica si el usuario tiene un rol específico.
   * @param role - El rol a verificar.
   * @returns true si el usuario tiene el rol, de lo contrario false.
   */
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  /**
   * Cierra la sesión del usuario y muestra un mensaje de confirmación.
   */
  async cerrar_sesion() {
    await this.authService.cerrar_sesion();
    this.presentToast('Se ha cerrado la sesión correctamente', 'success');
  }

  /**
   * Muestra un mensaje toast.
   * @param message - El mensaje a mostrar en el toast.
   */
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  /**
   * Navega a la página de creación de usuario y muestra un mensaje de redirección.
   */
  async ir_a_crear_usuario() {
    this.router.navigate(['/crear-usuario']);
    this.presentToast('Se ha redirigido a la página de creación de usuario', 'success');
  }

  /**
   * Navega a la página de incidentes y muestra un mensaje de redirección.
   */
  async ir_a_home() {
    this.router.navigate(['/incidentes']);
    this.presentToast('Se ha redirigido a la página de incidentes', 'success');
  }

  /**
   * Navega a la página de usuarios y muestra un mensaje de redirección.
   */
  async ver_usuarios() {
    this.router.navigate(['/mostrar-usuarios']);
    this.presentToast('Se ha redirigido a la página de usuarios', 'success');
  }

  /**
   * Navega a la página de reportes por cargas de trabajo y muestra un mensaje de redirección.
   */
  async ver_reportes_por_carga_trabajo() {
    this.router.navigate(['/reportes-por-cargas-trabajo']);
    this.presentToast('Se ha redirigido a la página de reportes por cargas de trabajo', 'success');
  }
}
