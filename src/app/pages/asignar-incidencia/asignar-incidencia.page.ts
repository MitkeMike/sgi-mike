import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminService } from 'src/app/Services/admin.service';
@Component({
  selector: 'app-asignar-incidencia',
  templateUrl: './asignar-incidencia.page.html',
  styleUrls: ['./asignar-incidencia.page.scss'],
})
export class AsignarIncidenciaPage implements OnInit {

  usuario: any;
  afectaciones: any[] = [];
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) { }

  ngOnInit(
  ) {
    const token = this.authService.obtener_token();
    if (!token) {
      console.error('No hay un token válido');
    }
    this.authService.obtener_usuario();

    this.authService.usuario_en_sesion.subscribe(
      data => {
        if (data) {
          this.usuario = data;
          console.log('Usuario en sesión:', data);
          this.obtener_afectaciones();
          console.log('Obteniendo afectaciones', this.obtener_afectaciones());

        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
  }

  async obtener_afectaciones() {
    try {
      const response = await this.adminService.obtener_afectaciones();
      if (response) {
        this.afectaciones = response;
        console.log('Afectaciones obtenidas:', response);
      } else {
        console.error('No se pudieron obtener las afectaciones.');
      }
    } catch (error) {
      console.error('Error al obtener las afectaciones:', error);
    }
  }

}
