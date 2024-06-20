import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable, from } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRoles = route.data['roles'];

    return this.authService.usuario_en_sesion.pipe(
      take(1),
      switchMap(usuario => {
        if (usuario) {
          return from(this.authService.obtener_roles_usuario_sesion()).pipe(
            map(roles => {
              const userRoles = roles.map((role: any) => role.ct_descripcion);
              const hasRole = expectedRoles.some((role: string) => userRoles.includes(role));
              if (!hasRole) {
                this.router.navigate(['/login']);
                return false;
              }
              return true;
            })
          );
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
