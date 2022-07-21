import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    public authService: AuthService,
    private logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private title: Title

  ) {}

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
        this.title.setTitle('EJC');
      })
      .catch( erro => this.errorHandlerService.handler(erro));

  }

}
