import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { IncidentesService } from 'src/app/Services/incidentes.service';
import { DiagnosticosService } from 'src/app/Services/diagnosticos.service';
import { ModalController } from '@ionic/angular';
import { FormModalIncidentesComponent } from 'src/app/form-modal-incidentes/form-modal-incidentes.component';
import { Router } from '@angular/router';
import { ModalFormDiagnosticosPage } from 'src/app/modal-form-diagnosticos/modal-form-diagnosticos.page';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { ModalCambiarEstadoIncidenciaPage } from 'src/app/modal-cambiar-estado-incidencia/modal-cambiar-estado-incidencia.page';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.page.html',
  styleUrls: ['./incidentes.page.scss'],
})
export class IncidentesPage implements OnInit {
  usuario: any;
  incidentes: any[] = [];
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();
  userRoles: string[] = [];

   estadosValidos = [
    { id: 1, descripcion: 'Registrado' },
    { id: 2, descripcion: 'Asignado' },
    { id: 3, descripcion: 'En Revisión' },
    { id: 4, descripcion: 'En Reparación' },
    { id: 6, descripcion: 'Terminado' },
    { id: 7, descripcion: 'Aprobado' },
    { id: 9, descripcion: 'Cerrado'}
];

  constructor(
    private authService: AuthService,
    private incidentesServices: IncidentesService,
    private diagnosticosServices: DiagnosticosService,
    private modalController: ModalController,
    private router: Router
  ) { }

  /**
   * ngOnInit - Método que se ejecuta al inicializar el componente.
   * Obtiene el token del usuario y luego obtiene al usuario en sesión.
   * Configura la búsqueda reactiva de incidentes.
   */
  ngOnInit() {
    const token = this.authService.obtener_token();
    if (!token) {
      console.error('No hay un token válido');
      return;
    }
    this.authService.obtener_usuario();

    this.authService.usuario_en_sesion.subscribe(
      async data => {
        if (data) {
          this.usuario = data;
          const roles = await this.authService.obtener_roles_usuario_sesion();
          this.userRoles = roles.map((role: any) => role.ct_descripcion);
          this.obtener_incidentes(); // Solo si hay un usuario logueado
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );

    // Búsqueda reactiva
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term === '') {
          return of(this.obtener_incidentes());
        } else {
          return this.incidentesServices.buscar_incidencia(term, term);
        }
      })
    ).subscribe(
      response => {
        this.incidentes = response || [];
      },
      error => {
        console.error('Error al buscar incidencia', error);
        this.incidentes = [];
      }
    );
  }

  /**
   * obtener_incidentes - Método para obtener todos los incidentes.
   * Llama al servicio incidentesServices para obtener la lista de incidentes.
   */
  async obtener_incidentes() {
    try {
      const response = await this.incidentesServices.obtener_incidentes();
      if (response) {
        this.incidentes = response;
      } else {
        console.error('No se pudieron obtener los incidentes.');
      }
    } catch (error) {
      console.error('Error al obtener los incidentes', error);
    }
  }

  /**
   * abrir_modal - Método para abrir el modal de creación de incidentes.
   */
  async abrir_modal() {
    const modal = await this.modalController.create({
      component: FormModalIncidentesComponent
    });
    await modal.present();
  }

  /**
   * cambiar_estado - Método para abrir el modal de cambio de estado de la incidencia.
   * @param ct_cod_incidencia - Código de la incidencia para cambiar el estado.
   */
  async cambiar_estado(ct_cod_incidencia: string) {
    const modal = await this.modalController.create({
      component: ModalCambiarEstadoIncidenciaPage,
      componentProps: {
        ct_cod_incidencia 
      }
    });
    await modal.present();
  }

  /**
   * ver_diagnostico - Método para navegar a la página de diagnósticos.
   * @param ct_cod_incidencia - Código de la incidencia para ver el diagnóstico.
   */
  ver_diagnostico(ct_cod_incidencia: string) {
    this.router.navigate(['/diagnosticos', ct_cod_incidencia]);
  }

  /**
   * crear_diagnostico - Método para abrir el modal de creación de diagnóstico.
   * @param ct_cod_incidencia - Código de la incidencia para crear el diagnóstico.
   */
  async crear_diagnostico(ct_cod_incidencia: string) {
    const modal = await this.modalController.create({
      component: ModalFormDiagnosticosPage,
      componentProps: {
        ct_cod_incidencia 
      }
    });
    await modal.present();
  }

  /**
   * onSearchChange - Método para manejar el cambio en el término de búsqueda.
   * @param event - Evento de cambio de búsqueda.
   */
  onSearchChange(event: any) {
    this.searchSubject.next(event.detail.value);
  }

  /**
   * hasRole - Método para verificar si el usuario tiene un rol específico.
   * @param role - Nombre del rol a verificar.
   * @returns - Devuelve true si el usuario tiene el rol, de lo contrario false.
   */
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  /**
   * verificar_estado_incidencia - Método para verificar si el estado de la incidencia permite ciertas acciones.
   * @param estado - Estado de la incidencia.
   * @returns - Devuelve true si el estado permite la acción, de lo contrario false.
   */
  verificar_estado_incidencia(estado: number): boolean {
    const tecnico = this.hasRole('Técnico') && estado >= 2 && estado < 5;
    const encargado = this.hasRole('Encargado') && estado < 2;
    const supervisor = this.hasRole('Supervisor') && (estado > 5 && estado < 8 || estado === 8);
    const result = tecnico || encargado || supervisor;
    return result;
  }

    /**
   * getEstadoDescripcion - Método para obtener la descripción de un estado por su ID.
   * @param id - ID del estado.
   * @returns - Devuelve la descripción del estado.
   */
    get_estado_descripcion(id: number): string {
      const estado = this.estadosValidos.find(e => e.id === id);
      return estado ? estado.descripcion : 'Desconocido';
    }

    getEstadoClase(id: number): string {
      switch (id) {
        case 1:
          return 'estado-registrado';
        case 2:
          return 'estado-asignado';
        case 3:
          return 'estado-en-revision';
        case 4:
          return 'estado-en-reparacion';
        case 6:
          return 'estado-terminado';
        case 7:
          return 'estado-aprobado';
        case 9:
          return 'estado-cerrado';
        default:
          return '';
      }
    }

    
}
