import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../Services/auth.service';
import { DiagnosticosService } from '../Services/diagnosticos.service';

@Component({
  selector: 'app-modal-form-diagnosticos',
  templateUrl: './modal-form-diagnosticos.page.html',
  styleUrls: ['./modal-form-diagnosticos.page.scss'],
})
export class ModalFormDiagnosticosPage implements OnInit {
  @Input() ct_cod_incidencia: string = '';
  ct_descripcion_diagnostico: string = '';
  cn_tiempo_estimado_solucion: number = 0;
  ct_observaciones: string = '';
  cn_user_id: number = 0;
  img: File | null = null;
  usuario: any;
  showToast: boolean = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private diagnosticosService: DiagnosticosService,
    private toastController: ToastController
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
          console.log('Usuario en sesión:', data);
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );
  }

  cerrar_modal() {
    this.modalController.dismiss();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.img = file;
  
      // Actualiza el texto del span para mostrar el nombre del archivo
      const fileNameSpan = document.getElementById('fileName');
      if (fileNameSpan) {
        fileNameSpan.textContent = file.name;
      }
    }
  }

  async crear_diagnostico() {
    if (!this.img) {
      console.error('Hace falta la imagen');
      return;
    }
    try {
      const token = await this.authService.obtener_token();
      if (!token) {
        console.error('No hay un token válido');
        return;
      }
      
      await this.diagnosticosService.crear_diagnostico(
        this.ct_cod_incidencia,
        this.usuario.cn_user_id,
        this.ct_descripcion_diagnostico,
        this.cn_tiempo_estimado_solucion,
        this.ct_observaciones,
        this.img
      );
      this.presentToast();
      this.cerrar_modal();
    } catch (error) {
      console.error('Error al crear el diagnóstico', error);
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha creado con éxito',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
