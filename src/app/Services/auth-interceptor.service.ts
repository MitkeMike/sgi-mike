import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  /**
   * Intercepta las solicitudes HTTP para añadir el token de autenticación a las cabeceras.
   * @param req - La solicitud HTTP saliente.
   * @param next - El siguiente manejador en la cadena de interceptores.
   * @returns Un Observable del evento HTTP.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del servicio de autenticación
    const token = this.authService.obtener_token();
    
    // Si existe un token, clonar la solicitud y añadir el token en las cabeceras
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pasar la solicitud (original o modificada) al siguiente manejador en la cadena
    return next.handle(req);
  }
}
