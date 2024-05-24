import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken'; // Clave para guardar el token en el almacenamiento local
  private usuario_en_sesion_aux= new BehaviorSubject<any>(null);
  public usuario_en_sesion = this.usuario_en_sesion_aux.asObservable();

  constructor(private http: HttpClient, private alertController: AlertController) { }

  async login(ct_correo: string, ct_password: string): Promise<any> {
    try {
      const response: any = await this.http.post(`${this.apiURL}auth/login`, { ct_correo, ct_password }).toPromise();
      console.log('Login exitoso', response);
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem(this.tokenKey, response.token);

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
    this.http.get(`${this.apiURL}usuarios/obtener-usuario`).subscribe(
      data => {
        this.usuario_en_sesion_aux.next(data);
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
    this.usuario_en_sesion_aux.next(null);
  }
}
