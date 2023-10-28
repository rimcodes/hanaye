import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrialGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


    const updateDate = 1701110611020;
    const todaysDate = Date.now();
    // console.log('Today: ', todaysDate);
    // console.log('Final Date: ', updateDate);
    console.log('Trials guard passed ');

    if (todaysDate > updateDate) {
      this.router.navigate(['/update']);
      return false;
    }
    return true;
  }
}
