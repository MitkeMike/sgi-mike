import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local

  constructor(private http: HttpClient, private alertController: AlertController) { }

  /**
   * Obtiene todas las incidencias.
   * @returns Una promesa con las incidencias.
   */
  async obtener_incidentes(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response: any = await this.http.get(`${this.apiURL}incidencias`, { headers }).toPromise();
      // Procesar las imágenes en base64
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

  /**
   * Crea una nueva incidencia.
   * @param ct_titulo_incidencia - El título de la incidencia.
   * @param cn_user_id - El ID del usuario que crea la incidencia.
   * @param ct_descripcion_incidencia - La descripción de la incidencia.
   * @param ct_lugar_incidencia - El lugar de la incidencia.
   * @param img - La imagen asociada a la incidencia.
   * @returns Una promesa con la respuesta del servidor.
   */
  async crear_incidente(
    ct_titulo_incidencia: string,
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

  /**
   * Actualiza una incidencia existente.
   * @param ct_cod_incidencia - El código de la incidencia.
   * @param cn_user_id - El ID del usuario que actualiza la incidencia.
   * @param afectacion - El nivel de afectación de la incidencia.
   * @param categoria - La categoría de la incidencia.
   * @param riesgo - El nivel de riesgo de la incidencia.
   * @param prioridad - La prioridad de la incidencia.
   * @param tiempo_estimado_reparacion - El tiempo estimado de reparación.
   * @returns Una promesa con la respuesta del servidor.
   */
  async actualizar_incidente(
    ct_cod_incidencia: string,
    cn_user_id: number,
    afectacion: number,
    categoria: number,
    riesgo: number,
    prioridad: number,
    tiempo_estimado_reparacion: number
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
        tiempo_estimado_reparacion
      };
  
      const response: any = await this.http.post(`${this.apiURL}incidencias/actualizar`, body, { headers }).toPromise();
      return response;
  
    } catch (error) {
      console.error('Error al actualizar el incidente', error);
      return null;
    }
  }

  /**
   * Busca incidencias por código o título.
   * @param ct_cod_incidencia - El código de la incidencia (opcional).
   * @param ct_titulo_incidencia - El título de la incidencia (opcional).
   * @returns Una promesa con las incidencias encontradas.
   */
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

  /**
   * Obtiene el estado de una incidencia específica.
   * @param ct_cod_incidencia - El código de la incidencia.
   * @returns Una promesa con el estado de la incidencia.
   */
  obtener_estado_incidencia(ct_cod_incidencia: string): Promise<any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return firstValueFrom(this.http.get(`${this.apiURL}incidencias/estado/${ct_cod_incidencia}`, { headers }));
  }

  /**
   * Cambia el estado de una incidencia específica.
   * @param ct_cod_incidencia - El código de la incidencia.
   * @param nuevo_estado - El nuevo estado de la incidencia.
   * @param cn_user_id - El ID del usuario que cambia el estado.
   * @returns Una promesa con la respuesta del servidor.
   */
  cambiar_estado_incidencia(ct_cod_incidencia: string, nuevo_estado: string, cn_user_id: number): Promise<any> {
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
