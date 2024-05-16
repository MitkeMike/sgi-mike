import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    // Aquí iría la lógica real de inicio de sesión, como enviar datos a un backend o autenticar localmente
    // Por simplicidad, solo redireccionaremos a otra página después de hacer clic en "Iniciar sesión"
    this.router.navigateByUrl('/dashboard');
  }

}
