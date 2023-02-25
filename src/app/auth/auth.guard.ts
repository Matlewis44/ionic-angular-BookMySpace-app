import { Injectable } from '@angular/core';
import { CanLoad, Route,  Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  //On injecte notre service d'état user dans notre service de protection
  constructor(private authService: AuthService, private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Si not connect
      if(!this.authService.getUserIsAuthentificated){
        this.router.navigateByUrl('/auth');
      }
      //Si connect
      return this.authService.getUserIsAuthentificated;
  }
}
