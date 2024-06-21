import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

interface Usuario {
  cn_user_id: number;
  ct_correo: string;
  ct_password?: string; // Hacer opcional para poder eliminarlo más fácilmente
  // Otros campos que puedas tener en el modelo Usuario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local
  private usuario_en_sesion_aux = new BehaviorSubject<Usuario | null>(null);
  public usuario_en_sesion = this.usuario_en_sesion_aux.asObservable();
  private userKey = 'authUser'; // Clave para guardar el usuario en el almacenamiento local

  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { 
    this.loadUserFromStorage();
  }

  /**
   * Inicia sesión del usuario y guarda el token de autenticación.
   * @param ct_correo - El correo del usuario.
   * @param ct_password - La contraseña del usuario.
   * @returns Una promesa con la respuesta del servidor.
   */
  async login(ct_correo: string, ct_password: string): Promise<any> {
    try {
      const response: any = await this.http.post(`${this.apiURL}auth/login`, { ct_correo, ct_password }).toPromise();
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem(this.tokenKey, response.token);

      // Obtener el usuario después del login y guardarlo en localStorage
      await this.obtener_usuario_sync();

      return response; 
    } catch (error) {
      console.error('Login error:', error);
      return null; // Devuelve null en caso de error
    }
  }

  /**
   * Obtiene los datos del usuario autenticado desde el servidor.
   */
  obtener_usuario(): void {
    const token = this.obtener_token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<Usuario>(`${this.apiURL}usuarios/obtener-usuario`, { headers }).subscribe(
      data => {
        const { ct_password, ...usuarioSinPassword } = data; // Elimina la contraseña del usuario antes de guardarlo
        this.usuario_en_sesion_aux.next(usuarioSinPassword);
        localStorage.setItem(this.userKey, JSON.stringify(usuarioSinPassword));
      },
      error => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  /**
   * Obtiene los datos del usuario autenticado de manera síncrona desde el servidor.
   */
  async obtener_usuario_sync(): Promise<void> {
    const token = this.obtener_token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const data = await firstValueFrom(this.http.get<Usuario>(`${this.apiURL}usuarios/obtener-usuario`, { headers }));
      const { ct_password, ...usuarioSinPassword } = data; // Elimina la contraseña del usuario antes de guardarlo
      this.usuario_en_sesion_aux.next(usuarioSinPassword);
      localStorage.setItem(this.userKey, JSON.stringify(usuarioSinPassword));
    } catch (error) {
      console.error('Error al obtener el usuario', error);
    }
  }

  /**
   * Obtiene el token de autenticación almacenado en el local storage.
   * @returns El token de autenticación.
   */
  obtener_token() {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Cierra la sesión del usuario, eliminando el token y los datos del usuario del local storage.
   */
  async cerrar_sesion() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.usuario_en_sesion_aux.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene los roles del usuario desde el servidor.
   * @param cn_id_usuario - El ID del usuario.
   * @returns Una promesa con los roles del usuario.
   */
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

  /**
   * Obtiene los roles del usuario actualmente en sesión.
   * @returns Una promesa con los roles del usuario.
   */
  async obtener_roles_usuario_sesion(): Promise<any> {
    const usuario = this.usuario_en_sesion_aux.getValue();
    if (usuario) {
      return this.obtener_roles_por_usuario(usuario.cn_user_id);
    } else {
      return [];
    }
  }

  /**
   * Carga los datos del usuario desde el local storage al iniciar la aplicación.
   */
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

  /**
   * Establece el usuario en sesión a null.
   */
  setUserSessionToNull(): void {
    this.usuario_en_sesion_aux.next(null);
  }

  /**
   * Verifica si hay un token de autenticación almacenado, indicando si el usuario está logueado.
   * @returns Verdadero si hay un token almacenado, falso de lo contrario.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
