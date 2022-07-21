import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { NoAuthenticatedError } from './../seguranca/money-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router
  ) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NoAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {

      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação!';
      }

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro.', errorResponse);
    }

    this.toastyService.error(msg);
  }
}
