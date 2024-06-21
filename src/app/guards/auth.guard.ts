import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable, from, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * canActivate - Método que determina si una ruta puede ser activada.
   * @param route - La ruta activada actualmente.
   * @param state - El estado del router.
   * @returns Observable<boolean> | Promise<boolean> | boolean - Retorna un booleano o un observable/promesa que emite un booleano.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRoles = route.data['roles']; // Obtiene los roles esperados de la ruta

    return this.authService.usuario_en_sesion.pipe(
      take(1), // Toma solo el primer valor emitido
      switchMap(usuario => {
        if (usuario) {
          // Si hay un usuario en sesión, obtiene sus roles
          return from(this.authService.obtener_roles_usuario_sesion()).pipe(
            map(roles => {
              const userRoles = roles.map((role: any) => role.ct_descripcion); // Mapea los roles del usuario
              const hasRole = expectedRoles.some((role: string) => userRoles.includes(role)); // Verifica si el usuario tiene algún rol esperado
              if (!hasRole) {
                this.router.navigate(['/login']); // Redirige al login si no tiene el rol necesario
                return false;
              }
              return true; // Permite el acceso si tiene el rol necesario
            })
          );
        } else {
          this.router.navigate(['/login']); // Redirige al login si no hay un usuario en sesión
          return of(false);
        }
      })
    );
  }
}
