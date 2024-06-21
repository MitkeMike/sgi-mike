import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

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

      const response: any = await this.http.get(`${this.apiURL}incidencias`, { headers }).toPromise();
      return response.map((incidencia: any) => {
        if (incidencia.imagen && incidencia.imagen.img) {
          const binary = new Uint8Array(incidencia.imagen.img.data).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
          const base64String = btoa(binary);
          incidencia.imagen.imgUrl = `data:image/jpeg;base64,${base64String}`;
        }
        return incidencia;
      });

    } catch (error) {
      console.error('Error al obtener los incidentes', error);
      return null;
    }
  }

  async crear_incidente(ct_titulo_incidencia: string,
    cn_user_id: number,
    ct_descripcion_incidencia: string,
    ct_lugar_incidencia: string,
    img: File
  ): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const formData = new FormData();
      formData.append('ct_titulo_incidencia', ct_titulo_incidencia);
      formData.append('cn_user_id', cn_user_id.toString());
      formData.append('ct_descripcion_incidencia', ct_descripcion_incidencia);
      formData.append('ct_lugar_incidencia', ct_lugar_incidencia);
      formData.append('img', img);

      const response: any = await this.http.post(`${this.apiURL}incidencias`, formData, { headers }).toPromise();
      return response;

    } catch (error) {
      console.error('Error al crear el incidente', error);
      return null;
    }
  }

  async actualizar_incidente(
    ct_cod_incidencia: string,
    cn_user_id: number,
    afectacion: number,
    categoria: number,
    riesgo: number,
    prioridad: number,
    tiempo_estimado_reparacion: number // Añadir el nuevo parámetro
  ): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      const body = {
        ct_cod_incidencia,
        cn_user_id,
        afectacion,
        categoria,
        riesgo,
        prioridad,
        tiempo_estimado_reparacion // Añadir el nuevo campo al cuerpo de la solicitud
      };
  
      const response: any = await this.http.post(`${this.apiURL}incidencias/actualizar`, body, { headers }).toPromise();
      return response;
  
    } catch (error) {
      console.error('Error al actualizar el incidente', error);
      return null;
    }
  }
  

  async buscar_incidencia(ct_cod_incidencia?: string, ct_titulo_incidencia?: string): Promise<any> {
    const url = `${this.apiURL}incidencias/buscar-incidencia`;
    const body = { ct_cod_incidencia, ct_titulo_incidencia };
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.post(url, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al buscar incidencia', error);
      throw error;
    }
  }


   obtener_estado_incidencia(ct_cod_incidencia: string): Promise <any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return firstValueFrom(this.http.get(`${this.apiURL}incidencias/estado/${ct_cod_incidencia}`, { headers }));
  }


  cambiar_estado_incidencia(ct_cod_incidencia: string, nuevo_estado: string, cn_user_id:number): Promise<any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      ct_cod_incidencia,
      nuevo_estado,
      cn_user_id
    };

    return firstValueFrom(this.http.post(`${this.apiURL}incidencias/cambiar-estado`, body, { headers }));
  }

}

