import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local
  private usuario_en_sesion_aux = new BehaviorSubject<any>(null);
  public usuario_en_sesion = this.usuario_en_sesion_aux.asObservable();
  private userKey = 'authUser'; // Clave para guardar el usuario en el almacenamiento local

  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { 
    this.loadUserFromStorage();
  }

  async login(ct_correo: string, ct_password: string): Promise<any> {
    try {
      const response: any = await this.http.post(`${this.apiURL}auth/login`, { ct_correo, ct_password }).toPromise();
      console.log('Login exitoso', response);
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem(this.tokenKey, response.token);

      // Obtener el usuario después del login y guardarlo en localStorage
      this.obtener_usuario();

      return response; 
    } catch (error) {
      console.error('Login error:', error);
      const alert = await this.alertController.create({
        header: 'Contraseña incorrecta',
        message: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
      return null; // Devuelve null en caso de error
    }
  }

  obtener_usuario(): void {
    const token = this.obtener_token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(`${this.apiURL}usuarios/obtener-usuario`, { headers }).subscribe(
      data => {
        this.usuario_en_sesion_aux.next(data);
        localStorage.setItem(this.userKey, JSON.stringify(data));
        console.log('Usuario obtenido', data);
      },
      error => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  obtener_token() {
    return localStorage.getItem(this.tokenKey);
  }

  async cerrar_sesion() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.usuario_en_sesion_aux.next(null);
    this.router.navigate(['/login']);
  }

  async obtener_roles_por_usuario(cn_id_usuario: number): Promise<any> {
    try {
      const token = this.obtener_token();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/usuario-roles/${cn_id_usuario}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los roles del usuario', error);
      throw error;
    }
  }

  async obtener_roles_usuario_sesion(): Promise<any> {
    const usuario = this.usuario_en_sesion_aux.getValue();
    if (usuario) {
      return this.obtener_roles_por_usuario(usuario.cn_user_id);
    } else {
      return [];
    }
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      try {
        this.usuario_en_sesion_aux.next(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing user from local storage:', error);
        localStorage.removeItem(this.userKey); // Limpiar el almacenamiento si hay un error
      }
    }
  }

  setUserSessionToNull(): void {
    this.usuario_en_sesion_aux.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
