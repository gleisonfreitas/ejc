import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EjcService } from './../../ejcs/ejc.service';
import { PermissaoService } from './../permissao.service';
import { UsuarioService } from './../usuario.service';

import { Usuario, Permissao } from './../../core/model';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.css']
})
export class UsuariosCadastroComponent implements OnInit {

  usuario = new Usuario();
  permissoesDisponiveis: Permissao[];
  confsenha: string;
  novasenha: string;
  ejcs = [];

  constructor(
    private usuarioService: UsuarioService,
    private ejcService: EjcService,
    private permissaoService: PermissaoService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {

    const codigo = this.route.snapshot.params['codigo'];

    this.listarEjcAtivos();
    this.title.setTitle('Novo Usuário');
    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
    setTimeout(function() {
      this.listarPermissoesDiponiveis();
    }.bind(this), 1);
  }

  get editando() {
    return Boolean(this.usuario.codigo);
  }

  salvar(form: FormControl) {

    if ( this.confsenha !== this.novasenha ) {

      this.toastyService.warning('Senha e confirmação não confere!');

    } else {

      this.usuario.senha = this.confsenha;

      if (this.editando) {
        this.atualizar(form);
      } else {
        this.adicionar(form);
      }
    }
  }

  adicionar(form: FormControl) {

    this.usuarioService.adicionar(this.usuario)
      .then( () => {

        this.toastyService.success('Usuario cadastrado com sucesso!');

        form.reset();
        this.usuario = new Usuario();

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizar(form: FormControl) {

    this.usuarioService.atualizar(this.usuario)
      .then( usuario => {
        this.toastyService.success('Usuário atualizado com sucesso!');
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  buscarPorCodigo(codigo: number) {

    this.usuarioService.buscarPorCodigo(codigo)
      .then( usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios', 'novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do usuário: ${this.usuario.nome}`);
  }

  listarPermissoesDiponiveis() {
    this.permissaoService.listarTodos()
      .then( response => {
        this.permissoesDisponiveis = response;

        this.usuario.permissoes.forEach(permissao => {
          this.permissoesDisponiveis =  this.permissoesDisponiveis.filter((val, i) => val.codigo !== permissao.codigo);
        });

      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  listarEjcAtivos() {
    this.ejcService.listarAtivos()
     .then( response => {

      this.ejcs = response.map( e => ({ label: e.igreja, value: e.codigo}));

     })
     .catch( erro => this.errorHandlerService.handler(erro));

  }

}
