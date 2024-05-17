import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ct_correo: string = '';
  ct_password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      
  }

  async login(event: Event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario
    try {
      const response = await this.authService.login(this.ct_correo, this.ct_password);
      console.log(response);

      //Redireccionar a la página de inicio
      this.router.navigate(['/incidentes']);
    } catch (error) {
      console.error('No se pudo iniciar Sesion',error);
    } 
  }

}
