import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivate {
  isWorker = true

  constructor(
    private router: Router,
    private storageService: LocalstorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.storageService.getToken()

      if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        if (tokenDecode.role === 'Employee') {
        this.isWorker = true
          return true
        }
        this.isWorker = false
        this.router.navigate(['/tabs/demands']);
        return false
      }
    return false;
  }

}
