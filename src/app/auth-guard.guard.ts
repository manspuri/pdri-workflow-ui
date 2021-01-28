import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PfAuthService } from '@pfit2ng/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

    constructor(private router: Router, private authService: PfAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentJwt = this.authService.getCurrentJwt();

        if (!this.authService.hasExplicitRole(['workflow', this.authService.getCurrentSub(), 'WF_INSTANCE_PROCESS'])) {
            this.router.navigate(['/views/notfound']);
            return false;
        }

        return true;
    }
}
