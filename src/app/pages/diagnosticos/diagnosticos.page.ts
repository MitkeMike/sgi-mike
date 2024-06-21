import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { DiagnosticosService } from 'src/app/Services/diagnosticos.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.page.html',
  styleUrls: ['./diagnosticos.page.scss'],
})
export class DiagnosticosPage implements OnInit {

  usuario: any;
  diagnosticos: any[] = [];
  ct_cod_incidencia: string = '';

  constructor(
    private authService: AuthService, 
    private diagnosticosServices: DiagnosticosService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * Obtiene el token del usuario y luego obtiene al usuario en sesión.
   * También obtiene los parámetros de la ruta activa para obtener el código de la incidencia.
   */
  ngOnInit() {
    const token = this.authService.obtener_token();
    if (!token) {
      console.error('No hay un token válido');
      return; // Salir temprano si no hay token válido
    }

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

    this.route.params.subscribe(params => {
      this.ct_cod_incidencia = params['ct_cod_incidencia']; // Usamos 'ct_cod_incidencia' en lugar de 'id'
      if (this.ct_cod_incidencia) {
        this.obtener_diagnosticos(this.ct_cod_incidencia);
      } else {
        console.error('No se proporcionó un ct_cod_incidencia válido');
      }
    });
  }

  /**
   * obtener_diagnosticos - Método para obtener los diagnósticos de una incidencia específica.
   * Llama al servicio diagnosticosServices para obtener los diagnósticos de la incidencia.
   * @param ct_cod_incidencia - Código de la incidencia para la cual obtener los diagnósticos.
   */
  async obtener_diagnosticos(ct_cod_incidencia: string) {
    try {
      const response = await this.diagnosticosServices.obtener_diagnosticos(ct_cod_incidencia);
      this.diagnosticos = response;
    } catch (error) {
      console.error('Error al obtener los diagnósticos', error);
    }
  }

  /**
   * volver - Método para navegar de vuelta a la página de incidentes.
   */
  volver() {
    this.router.navigate(['/incidentes']);
  }
}
