import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { RequisicaoAlteracaoSenha, UsuarioService } from './../usuario.service';

@Component({
  selector: 'app-usuarios-altera-senha',
  templateUrl: './usuarios-altera-senha.component.html',
  styleUrls: ['./usuarios-altera-senha.component.css']
})
export class UsuariosAlteraSenhaComponent implements OnInit {

  requisicao = new RequisicaoAlteracaoSenha();

    confsenha: string;

    constructor(
      private usuarioService: UsuarioService,
      private authService: AuthService,
      private toastyService: ToastyService,
      private errorHandlerService: ErrorHandlerService

    ) { }

    ngOnInit() {
      this.requisicao.email = this.authService.jwtPayload.user_name;
    }

    salvar(form: FormControl) {

      if ( this.confsenha !== this.requisicao.novaSenha ) {

        this.toastyService.warning('Senha nova e confirmação não confere!');

      } else {

        this.usuarioService.alterarSenha(this.requisicao)
        .then( () => {

          this.toastyService.success('Senha alterada com sucesso!');

          form.reset();
          this.requisicao = new RequisicaoAlteracaoSenha();

        }).catch( erro => this.errorHandlerService.handler(erro));
      }
    }

}
