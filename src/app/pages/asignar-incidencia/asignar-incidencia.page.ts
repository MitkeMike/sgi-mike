import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminService } from 'src/app/Services/admin.service';
import { IncidentesService } from 'src/app/Services/incidentes.service';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asignar-incidencia',
  templateUrl: './asignar-incidencia.page.html',
  styleUrls: ['./asignar-incidencia.page.scss'],
})
export class AsignarIncidenciaPage implements OnInit {

  usuario: any;
  afectaciones: any[] = [];
  categorias: any[] = [];
  estados: any[] = [];
  riesgos: any[] = [];
  prioridades: any[] = [];
  tecnicos: any[] = [];
  ct_cod_incidencia: string = '';
  selectedAfectacion: any;
  selectedCategoria: any;
  selectedRiesgos: any;
  selectedPrioridades: any;
  selectedTecnicos: any;
  tiempoEstimadoReparacion: number = 0;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private authService: AuthService,
    private incidentesService: IncidentesService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController
  ) { }

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * Obtiene el código de la incidencia desde la ruta y el token del usuario.
   * Luego obtiene al usuario en sesión y carga las listas necesarias (afectaciones, categorías, etc.).
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('ct_cod_incidencia');
    if (id) {
      this.ct_cod_incidencia = id;
    } else {
      console.error('No se recibió el código de la incidencia');
    }
    const token = this.authService.obtener_token();
    if (!token) {
      console.error('No hay un token válido');
    }
    this.authService.obtener_usuario();

    this.authService.usuario_en_sesion.subscribe(
      data => {
        if (data) {
          this.usuario = data;
          this.obtener_afectaciones();
          this.obtener_categorias();
          this.obtener_estados();
          this.obtener_riesgos();
          this.obtener_prioridades();
          this.obtener_tecnicos();
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
   * obtener_afectaciones - Método para obtener las afectaciones.
   * Llama al servicio adminService para obtener las afectaciones.
   */
  async obtener_afectaciones() {
    try {
      const response = await this.adminService.obtener_afectaciones();
      if (response) {
        this.afectaciones = response;
      } else {
        console.error('No se pudieron obtener las afectaciones.');
      }
    } catch (error) {
      console.error('Error al obtener las afectaciones:', error);
    }
  }

  /**
   * obtener_categorias - Método para obtener las categorías.
   * Llama al servicio adminService para obtener las categorías.
   */
  async obtener_categorias() {
    try {
      const response = await this.adminService.obtener_categorias();
      if (response) {
        this.categorias = response;
      } else {
        console.error('No se pudieron obtener las categorías.');
      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  }

  /**
   * obtener_estados - Método para obtener los estados.
   * Llama al servicio adminService para obtener los estados.
   */
  async obtener_estados() {
    try {
      const response = await this.adminService.obtener_estados();
      if (response) {
        this.estados = response;
      } else {
        console.error('No se pudieron obtener los estados.');
      }
    } catch (error) {
      console.error('Error al obtener los estados:', error);
    }
  }

  /**
   * obtener_riesgos - Método para obtener los riesgos.
   * Llama al servicio adminService para obtener los riesgos.
   */
  async obtener_riesgos() {
    try {
      const response = await this.adminService.obtener_riesgos();
      if (response) {
        this.riesgos = response;
      } else {
        console.error('No se pudieron obtener los riesgos.');
      }
    } catch (error) {
      console.error('Error al obtener los riesgos:', error);
    }
  }

  /**
   * obtener_prioridades - Método para obtener las prioridades.
   * Llama al servicio adminService para obtener las prioridades.
   */
  async obtener_prioridades() {
    try {
      const response = await this.adminService.obtener_prioridades();
      if (response) {
        this.prioridades = response;
      } else {
        console.error('No se pudieron obtener las prioridades.');
      }
    } catch (error) {
      console.error('Error al obtener las prioridades:', error);
    }
  }

  /**
   * obtener_tecnicos - Método para obtener los técnicos.
   * Llama al servicio adminService para obtener los técnicos.
   */
  async obtener_tecnicos() {
    try {
      const response = await this.adminService.obtener_tecnicos();
      if (response) {
        this.tecnicos = response;
      } else {
        console.error('No se pudieron obtener los técnicos.');
      }
    } catch (error) {
      console.error('Error al obtener los técnicos:', error);
    }
  }

  /**
   * isFormValid - Método para verificar si el formulario es válido.
   * @returns boolean - Verdadero si el formulario es válido.
   */
  isFormValid(): boolean {
    return this.selectedAfectacion && this.selectedCategoria &&
      this.selectedRiesgos && this.selectedPrioridades && this.selectedTecnicos;
  }

  /**
   * asignar_incidencia - Método para asignar una incidencia.
   * Envía los datos de la incidencia al servicio incidentesService para su actualización.
   * Muestra un mensaje toast en caso de éxito y recarga la página.
   */
  async asignar_incidencia() {
    const incidenciaData = {
      ct_cod_incidencia: this.ct_cod_incidencia,
      cn_user_id: this.selectedTecnicos,
      afectacion: this.selectedAfectacion,
      categoria: this.selectedCategoria,
      riesgo: this.selectedRiesgos,
      prioridad: this.selectedPrioridades,
      tiempo_estimado_reparacion: this.tiempoEstimadoReparacion
    };
  
    try {
      const response = await this.incidentesService.actualizar_incidente(
        incidenciaData.ct_cod_incidencia,
        incidenciaData.cn_user_id,
        incidenciaData.afectacion,
        incidenciaData.categoria,
        incidenciaData.riesgo,
        incidenciaData.prioridad,
        incidenciaData.tiempo_estimado_reparacion
      );
      if (response) {
        this.presentToast('Se ha asignado con éxito la incidencia');
        window.location.reload();
      } else {
        console.error('Error al asignar la incidencia');
      }
    } catch (error) {
      console.error('Error al asignar la incidencia:', error);
    }
  }

  /**
   * presentToast - Método para mostrar un mensaje toast.
   * @param message - El mensaje a mostrar en el toast.
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  /**
   * resetForm - Método para resetear el formulario.
   * @param form - El formulario a resetear.
   */
  resetForm(form: NgForm) {
    form.resetForm();
  }
}
