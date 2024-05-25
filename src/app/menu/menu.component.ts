import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  navegar_incidentes() {
    this.router.navigate(['/incidentes']);
  }

  cerrar_sesion() {
    this.authService.cerrar_sesion();
    this.router.navigate(['/login']);
  }

}
