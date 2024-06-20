import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userRoles: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.usuario_en_sesion.subscribe(async usuario => {
      if (usuario) {
        const roles = await this.authService.obtener_roles_usuario_sesion();
        this.userRoles = roles.map((role: any) => role.ct_descripcion);
      }
    });

    // Check if the user is already logged in
    if (this.authService.isLoggedIn()) {
      this.authService.obtener_usuario();
    }
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  async cerrar_sesion() {
    await this.authService.cerrar_sesion();
  }

  async ir_a_crear_usuario() {
    this.router.navigate(['/crear-usuario']);
  }

  async ir_a_home() {
    this.router.navigate(['/incidentes']);
  }

  async ver_usuarios() {
    this.router.navigate(['/mostrar-usuarios']);
  }

  async ver_reportes_por_carga_trabajo() {
    this.router.navigate(['/reportes-por-cargas-trabajo']);
  }
}
