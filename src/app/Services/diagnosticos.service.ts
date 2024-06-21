import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los diagnósticos asociados a una incidencia específica.
   * @param ct_cod_incidencia - El código de la incidencia.
   * @returns Una promesa con los diagnósticos de la incidencia.
   */
  async obtener_diagnosticos(ct_cod_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response: any = await this.http.get(`${this.apiURL}diagnosticos/${ct_cod_incidencia}`, { headers }).toPromise();
      
      // Procesar las imágenes en base64
      return response.map((diagnostico: any) => {
        if (diagnostico.imagen && diagnostico.imagen.img) {
          const binary = new Uint8Array(diagnostico.imagen.img.data).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
          const base64String = btoa(binary);
          diagnostico.imagen.imgUrl = `data:image/jpeg;base64,${base64String}`;
        }
        return diagnostico;
      });

    } catch (error) {
      console.error('Error al obtener los diagnósticos', error);
      return null;
    }
  }

  /**
   * Crea un nuevo diagnóstico para una incidencia específica.
   * @param ct_cod_incidencia - El código de la incidencia.
   * @param cn_user_id - El ID del usuario que crea el diagnóstico.
   * @param ct_descripcion_diagnostico - La descripción del diagnóstico.
   * @param cn_tiempo_estimado_solucion - El tiempo estimado de solución en horas.
   * @param ct_observaciones - Observaciones adicionales.
   * @param img - La imagen asociada al diagnóstico.
   * @returns Una promesa con la respuesta del servidor.
   */
  async crear_diagnostico(
    ct_cod_incidencia: string,
    cn_user_id: number,
    ct_descripcion_diagnostico: string,
    cn_tiempo_estimado_solucion: number,
    ct_observaciones: string,
    img: File  
  ): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const formData = new FormData();
      formData.append('ct_cod_incidencia', ct_cod_incidencia);
      formData.append('cn_user_id', cn_user_id.toString());
      formData.append('ct_descripcion_diagnostico', ct_descripcion_diagnostico);
      formData.append('cn_tiempo_estimado_solucion', cn_tiempo_estimado_solucion.toString());
      formData.append('ct_observaciones', ct_observaciones);
      formData.append('img', img);

      const response: any = await this.http.post(`${this.apiURL}diagnosticos`, formData, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al crear el diagnóstico', error);
      return null;
    }
  }
}
