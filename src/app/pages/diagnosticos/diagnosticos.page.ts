import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { DiagnosticosService } from 'src/app/Services/diagnosticos.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

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
          console.log('Usuario en sesión:', data);
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

  async obtener_diagnosticos(ct_cod_incidencia: string) {
    try {
      const response = await this.diagnosticosServices.obtener_diagnosticos(ct_cod_incidencia);
      this.diagnosticos = response;
      console.log('Diagnosticos obtenidos:', response);
    } catch (error) {
      console.error('Error al obtener los diagnósticos', error);
    }
  }

    /*
  async abrir_modal() {
    const modal = await this.modalController.create({
      component: FormModalDiagnosticosComponent
    });
    await modal.present();
  }
*/
}
