import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalFormAnadirRolPage } from 'src/app/modal-form-anadir-rol/modal-form-anadir-rol.page';
import { ModalFormEliminarRolPage  } from 'src/app/modal-form-eliminar-rol/modal-form-eliminar-rol.page';
@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.page.html',
  styleUrls: ['./mostrar-usuarios.page.scss'],
})
export class MostrarUsuariosPage implements OnInit {


  usuario: any;
  usuarios: any[] = [];
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
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
          this.obtener_usuarios(); 
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
          return of (this.obtener_usuarios());
        } else {
          return this.buscar_usuarios(term);
        }
      })
    ).subscribe(
      response => {
        this.usuarios = response || [];
      },
      error => {
        console.error('Error al buscar usuarios', error);
        this.usuarios = [];
      }
    );
  }

  async obtener_usuarios() {
    try {
      const response: any = await this.adminService.obtener_usuarios();
      if (response) {
        console.log('Usuarios:', response);
        this.usuarios = response;
      } else {
        console.error('No se obtuvieron los usuarios');
      }
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  }

  buscar_usuarios(term: string) {
    return this.adminService.buscar_usuarios(term);
  }

  onSearchChange(event: any) {
    this.searchSubject.next(event.detail.value);
  }

  async abrirAsignarRolesModal(cn_user_id: number) {
    const modal = await this.modalController.create({
      component: ModalFormAnadirRolPage,
      componentProps: { cn_user_id }
    });
    await modal.present();
  }

  async abrirEliminarRolesModal(cn_user_id: number) {
    const modal = await this.modalController.create({
      component: ModalFormEliminarRolPage,
      componentProps: { cn_user_id }
    });
    await modal.present();
  }

}
