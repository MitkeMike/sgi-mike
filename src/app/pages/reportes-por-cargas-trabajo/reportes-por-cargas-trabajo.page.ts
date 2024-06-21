import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-reportes-por-cargas-trabajo',
  templateUrl: './reportes-por-cargas-trabajo.page.html',
  styleUrls: ['./reportes-por-cargas-trabajo.page.scss'],
})
export class ReportesPorCargasTrabajoPage implements OnInit {
  usuario: any;
  reportes: any[] = [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) { }

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * Verifica la existencia de un token, obtiene el usuario en sesión y sus datos, y obtiene los reportes por horas trabajadas.
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
          this.reportes_por_horas_trabajadas();
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
   * reportes_por_horas_trabajadas - Método para obtener los reportes por horas trabajadas desde el servicio de administración.
   */
  async reportes_por_horas_trabajadas() {
    try {
      const response = await this.adminService.reporte_por_horas_trabajadas();
      if (response) {
        this.reportes = response;
      } else {
        console.error('No se pudieron obtener los reportes.');
      }
    } catch (error) {
      console.error('Error al obtener los reportes: ', error);
    }
  }

}
