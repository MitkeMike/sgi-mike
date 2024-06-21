import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local

  constructor(private http: HttpClient) { }

  /**
   * Obtener afectaciones desde el servidor.
   */
  async obtener_afectaciones(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/afectaciones`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las afectaciones', error);
      return null;
    }
  }

  /**
   * Obtener categorías desde el servidor.
   */
  async obtener_categorias(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/categorias`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las categorías', error);
    }
  }

  /**
   * Obtener estados desde el servidor.
   */
  async obtener_estados(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/estados`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los estados', error);
    }
  }

  /**
   * Obtener riesgos desde el servidor.
   */
  async obtener_riesgos(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/riesgos`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los riesgos', error);
    }
  }

  /**
   * Obtener prioridades desde el servidor.
   */
  async obtener_prioridades(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/prioridades`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las prioridades', error);
    }
  }

  /**
   * Obtener reporte por horas trabajadas desde el servidor.
   */
  async reporte_por_horas_trabajadas(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/reporte-horas-trabajadas`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los reportes', error);
    }
  }

  /**
   * Obtener técnicos desde el servidor.
   */
  async obtener_tecnicos(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/tecnicos`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los técnicos', error);
      throw error; // Propagar el error para manejarlo en el componente
    }
  }

  /**
   * Crear un nuevo usuario.
   */
  async crear_usuario(
    ct_nombre: string,
    ct_cedula: string,
    ct_puesto: string,
    ct_correo: string,
    ct_password: string
  ): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const body = {
        ct_nombre,
        ct_cedula,
        ct_puesto,
        ct_correo,
        ct_password
      };
      const response: any = await this.http.post(`${this.apiURL}usuarios`, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al crear el usuario', error);
      return null;
    }
  }

  /**
   * Obtener usuarios desde el servidor.
   */
  async obtener_usuarios(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}usuarios`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  }

  /**
   * Buscar usuarios en el servidor.
   */
  buscar_usuarios(term: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { ct_nombre: term, ct_cedula: term, ct_correo: term };
    return this.http.post(`${this.apiURL}usuarios/buscar-usuario`, body, { headers });
  }

  /**
   * Obtener roles desde el servidor.
   */
  async obtener_roles(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/roles`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los roles', error);
    }
  }

  /**
   * Asignar roles a un usuario.
   */
  async asignar_roles(cn_user_id: number, roles: any[]): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const body = {
        cn_id_usuario: cn_user_id,
        roles
      };
      const response: any = await this.http.post(`${this.apiURL}admin/asignar-roles`, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al asignar los roles', error);
      throw error;
    }
  }

  /**
   * Obtener roles de un usuario específico.
   */
  async roles_por_usuario(cn_id_usuario: number): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
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
   * Eliminar roles de un usuario específico.
   */
  async eliminar_roles(cn_user_id: number, roles: any[]): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const body = {
        cn_id_usuario: cn_user_id,
        cn_id_roles: roles
      };
      const response: any = await this.http.post(`${this.apiURL}admin/eliminar-roles`, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al eliminar los roles', error);
      throw error;
    }
  }
}
