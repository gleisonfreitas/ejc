import { LogoutService } from './logout.service';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthGuard } from './auth.guard';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';

export function authHttpServiceFactory(authService: AuthService, http: Http, options: RequestOptions) {
  const authConfig = new AuthConfig({
    globalHeaders: [
      {'Content-Type': 'application/json'}
    ]
  });

  return  new MoneyHttp(authService, authConfig, http, options);
}

@NgModule({
  imports: [
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,

  ],
  declarations: [LoginFormComponent],
  exports: [],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
  AuthGuard,
  LogoutService
  ]
})
export class SegurancaModule { }
