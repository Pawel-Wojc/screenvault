import { Attribute, Component, ElementRef } from '@angular/core';
import { IAuthService } from '../auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-secure-outlet',
  standalone: true,
  imports: [],
  templateUrl: './secure-outlet.component.html',
  styleUrl: './secure-outlet.component.css',
})
export class SecureOutletComponent {}

export class SecureRouterOutlet extends RouterOutlet {
  private parentRouter: Router;
  private authService: IAuthService;

  constructor(
    _elementRef: ElementRef,
    _loader: NgComponentOutlet,
    _parentRouter: Router,
    @Attribute('name') nameAttr: string,
    authService: IAuthService
  ) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.parentRouter = _parentRouter;
    this.authService = authService;
  }

  activate(nextInstruction: ComponentInstruction): Promise<any> {
    var roles = <string[]>nextInstruction.routeData.data['roles'];

    // no roles defined means route has no restrictions so activate
    if (roles == null) {
      return super.activate(nextInstruction);
    }

    // if user isn't authenticated then redirect to sign-in route
    // pass the URL to this route for redirecting back after auth
    // TODO: include querystring parameters too?
    if (!this.authService.isAuthenticated()) {
      var ins = this.parentRouter.generate([
        this.signin,
        { url: location.pathname },
      ]);
      return super.activate(ins.component);
    }

    // if no specific roles are required *or* the user has one of the
    // roles required then the route can be activated
    if (roles.length == 0 || this.authService.hasRole(roles)) {
      return super.activate(nextInstruction);
    }

    // user has insufficient role permissions so redirect to denied
    var ins = this.parentRouter.generate([this.unauthorized]);
    return super.activate(ins.component);
  }

  reuse(nextInstruction: ComponentInstruction): Promise<any> {
    return super.reuse(nextInstruction);
  }
}
