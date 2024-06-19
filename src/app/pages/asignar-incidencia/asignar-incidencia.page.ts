import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminService } from 'src/app/Services/admin.service';
import { IncidentesService } from 'src/app/Services/incidentes.service';
import { NgForm } from '@angular/forms';

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
  riesgos: any [] = [];
  prioridades: any [] = [];
  tecnicos: any [] = [];
  ct_cod_incidencia: string = '';
  selectedAfectacion: any;
  selectedCategoria: any;
  selectedRiesgos: any;
  selectedPrioridades: any;
  selectedTecnicos: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private authService: AuthService,
    private incidentesService: IncidentesService,
    private cdr: ChangeDetectorRef
  ) { }

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
          console.log('Usuario en sesión:', data);
          this.obtener_afectaciones();
          this.obtener_categorias();
          this.obtener_estados();
          this.obtener_riesgos();
          this.obtener_prioridades();
          this.obtener_tecnicos();
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
      } else {
        console.error('No se pudieron obtener las afectaciones.');
      }
    } catch (error) {
      console.error('Error al obtener las afectaciones:', error);
    }
  }

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

  async obtener_prioridades() {
    try {
      const response = await this.adminService.obtener_prioridades();
      if (response) {
        this.prioridades = response;
        console.log('Prioridades:', this.prioridades);
      } else {
        console.error('No se pudieron obtener las prioridades.');
      }
    } catch (error) {
      console.error('Error al obtener las prioridades:', error);
    }
  }

  async obtener_tecnicos() {
    try {
        const response = await this.adminService.obtener_tecnicos();
        console.log('Respuesta de obtener_tecnicos en el componente:', response); // Añadido para depuración
        if (response) {
            this.tecnicos = response;
            console.log('Técnicos:', this.tecnicos);
        } else {
            console.error('No se pudieron obtener los técnicos.');
        }
    } catch (error) {
        console.error('Error al obtener los técnicos:', error);
    }
}

  isFormValid(): boolean {
    return this.selectedAfectacion && this.selectedCategoria &&
      this.selectedRiesgos && this.selectedPrioridades && this.selectedTecnicos;
  }

  asignar_incidencia() {
    const incidenciaData = {
      ct_cod_incidencia: this.ct_cod_incidencia,
      cn_user_id: this.selectedTecnicos,
      afectacion: this.selectedAfectacion,
      categoria: this.selectedCategoria,
      riesgo: this.selectedRiesgos,
      prioridad: this.selectedPrioridades
    };
    console.log('Incidencia a asignar:', incidenciaData);

    this.incidentesService.actualizar_incidente(
      incidenciaData.ct_cod_incidencia,
      incidenciaData.cn_user_id,
      incidenciaData.afectacion,
      incidenciaData.categoria,
      incidenciaData.riesgo,
      incidenciaData.prioridad
    ).then(response => {
      console.log('Respuesta del servidor:', response);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }
}
