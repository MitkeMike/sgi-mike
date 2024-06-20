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

  constructor(
    private authService: AuthService,
    private incidentesServices: IncidentesService,
    private diagnosticosServices: DiagnosticosService,
    private modalController: ModalController,
    private router: Router
  ) { }

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
          console.log('Usuario en sesión:', data);
          const roles = await this.authService.obtener_roles_usuario_sesion();
          this.userRoles = roles.map((role: any) => role.ct_descripcion);
          this.obtener_incidentes(); //Solo si hay un usuario logueado
        } else {
          console.error('No hay usuario en sesión');
        }
      },
      error => {
        console.error('Error al obtener el usuario en sesión', error);
      }
    );

    //Busqueda reactiva
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

  async obtener_incidentes() {
    try {
      const response = await this.incidentesServices.obtener_incidentes();
      if (response) {
        this.incidentes = response;
        console.log('Incidentes obtenidos:', response);
      } else {
        console.error('No se pudieron obtener los incidentes.');
      }
    } catch (error) {
      console.error('Error al obtener los incidentes', error);
    }
  }

  async abrir_modal() {
    const modal = await this.modalController.create({
      component: FormModalIncidentesComponent
    });
    await modal.present();
  }

  async cambiar_estado(ct_cod_incidencia: string) {
    const modal = await this.modalController.create({
      component: ModalCambiarEstadoIncidenciaPage,
      componentProps: {
        ct_cod_incidencia 
      }
    });
    await modal.present();
  }

  ver_diagnostico(ct_cod_incidencia: string) {
    this.router.navigate(['/diagnosticos', ct_cod_incidencia]);
  }

  async crear_diagnostico(ct_cod_incidencia: string) {
    const modal = await this.modalController.create({
      component: ModalFormDiagnosticosPage,
      componentProps: {
        ct_cod_incidencia 
      }
    });
    await modal.present();
  }

  onSearchChange(event: any) {
    this.searchSubject.next(event.detail.value);
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
