import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private router: Router,
    private storageService: LocalstorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.storageService.getToken();
      // console.log(token);


      if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        // console.log(tokenDecode);

        if ((tokenDecode.role === 'Admin') && !this._tokenExpired(tokenDecode.exp)){
          return true;
        }

      }
      this.router.navigate(['/login']);
      return false
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }


}
