import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local

  constructor(private http: HttpClient) { }


  async obtener_diagnosticos(ct_cod_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response: any = await this.http.get(`${this.apiURL}diagnosticos/${ct_cod_incidencia}`).toPromise();
      console.log('Diagnosticos obtenidos', response);
      return response;

    } catch (error) {
      console.error('Error al obtener los diagnósticos', error);
      return null;
    }
  }

  async crear_diagnostico(diagnostico: any): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return await this.http.post(`${this.apiURL}diagnosticos`, diagnostico, { headers }).toPromise();
    } catch (error) {
      console.error('Error al crear el diagnóstico', error);
      return null;
    }

  }


}
