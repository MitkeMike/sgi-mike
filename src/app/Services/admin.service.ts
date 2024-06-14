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

  async obtener_categorias(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/categorias`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las categorias', error);
    }
  }

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

  async obtener_tecnicos (): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response: any = await this.http.get(`${this.apiURL}admin/tecnicos`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los técnicos', error);
    }
  }

  async crear_usuario(
    ct_nombre:string,
    ct_cedula:string,
    ct_puesto:string,
    ct_correo:string,
    ct_password:string
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

  buscar_usuarios(term: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { ct_nombre: term, ct_cedula: term, ct_correo: term };
    return this.http.post(`${this.apiURL}usuarios/buscar-usuario`, body, { headers });
  }


}
