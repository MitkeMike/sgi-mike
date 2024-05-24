import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local

  constructor(private http: HttpClient, private alertController: AlertController) { }

  async obtener_incidentes(): Promise<any> {
    try {

      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response: any = await this.http.get(`${this.apiURL}incidencias`).toPromise();
      console.log('Incidentes obtenidos', response);
      return response;

    } catch (error) {
      console.error('Error al obtener los incidentes', error);
      return null;
    }
  }

  async crear_incidente(ct_titulo_incidencia: string, 
    cn_user_id: number,
    ct_descripcion_incidencia: string, 
    ct_lugar_incidencia: string
  ): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response: any = await this.http.post(`${this.apiURL}incidencias`, {
        ct_titulo_incidencia,
        cn_user_id,
        ct_descripcion_incidencia,
        ct_lugar_incidencia
        }, { headers }).toPromise();

    } catch (error) {
      console.error('Error al crear el incidente', error);
      return null;
    }
  }
}

