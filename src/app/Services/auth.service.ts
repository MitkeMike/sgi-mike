import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient, private alertController: AlertController) { }


  async login(ct_correo: string, ct_password: string): Promise<any> {
    try {
      const response = await this.http.post(`${this.apiURL}usuarios/login`, { ct_correo, ct_password }).toPromise();
      console.log('Login exitoso', response);
      return response;
      
    } catch (error) {
      console.error('Login error:', error);
      const alert = await this.alertController.create({
        header: 'Contraseña incorrecta',
        message: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  
}
