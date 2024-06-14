import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  async cerrar_sesion() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  async ir_a_crear_usuario() {
    this.router.navigate(['/crear-usuario']);
  }

  async ir_a_home() {
    this.router.navigate(['/incidentes']);
  }
}
