// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";

// @Injectable({
//   providedIn: 'root'
// })
// export class ActivatedGuard implements CanActivate {

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

// }

export const ActivatedGuard: CanActivateFn = (

  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    // your  logic goes here
    return false;
}
