import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

      const response: any = await this.http.get(`${this.apiURL}/admin/afectaciones`, { headers }).toPromise();
      console.log('Afectaciones obtenidas', response);

      return response;
    } catch (error) {
      console.error('Error al obtener las afectaciones', error);
      return null;
    }
  }

}
