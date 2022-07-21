import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EquipeService } from './../equipe.service';
import { PessoaService, PessoaFiltro } from './../../pessoas/pessoa.service';
import { Equipe, Pessoa } from './../../core/model';

@Component({
  selector: 'app-equipes-cadastro',
  templateUrl: './equipes-cadastro.component.html',
  styleUrls: ['./equipes-cadastro.component.css']
})
export class EquipesCadastroComponent implements OnInit {

  equipe = new Equipe();
  pessoas = [];
  filtro = new PessoaFiltro();
  pessoasDisponiveis = [];
  equipes = [];

  constructor(
    private pessoaService: PessoaService,
    private equipeService: EquipeService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit(
  ) {
    this.listarPessoas();
    this.pesquisarEncontreiros();
    this.listarNomesEquipes();

    this.title.setTitle('Nova Equipe');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
  }

  listarNomesEquipes() {
    this.equipeService.listarNomesEquipes()
      .then( response => {
        this.equipes = response.map( e => ({ label: e.descricao, value: e.nome }));
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  buscarPorCodigo(codigo: number) {
    this.equipeService.buscarPorCodigo(codigo)
      .then( response => {
        this.equipe = response;
        if (this.equipe.coordenadorTres === null) {
          this.equipe.coordenadorTres = new Pessoa();
        }
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de equipe: ${this.equipe.nome}`);
  }

  get editando() {
    return Boolean(this.equipe.codigo);
  }

  pesquisarPessoas(pessoas: any) {
    this.pessoaService.listarEncontreiroDisponiveis()
      .then( resultado => {
        resultado.forEach(p => {
          const pessoa = new Pessoa();
          pessoa.codigo = p.codigo;
          pessoa.nome = p.nome;
          pessoas.push(pessoa);
        });
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  pesquisarEncontreiros() {
    this.pessoasDisponiveis = [];
    this.pesquisarPessoas(this.pessoasDisponiveis);
  }

  listarPessoas() {

    this.pessoaService.pesquisarCoordenadores()
      .then( resultado => {
        this.pessoas = resultado.map( p => ({ label: p.nome, value: p.codigo}));
        this.pessoas.push({ label: 'Nenhum', value: null });
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEquipe(form);
    } else {
      this.adicionarEquipe(form);
    }

  }

  adicionarEquipe(form: FormControl) {

    this.spinnerService.show();
    this.equipeService.adicionar(this.equipe)
      .then( () => {

        this.spinnerService.hide();
        this.toastyService.success('Equipe cadastrada com sucesso!');

       this.novo(form);

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarEquipe(form: FormControl) {

    this.spinnerService.show();
    this.equipeService.atualizar(this.equipe)
      .then( () => {

        this.spinnerService.hide();
        this.toastyService.success('Equipe atualizada com sucesso!');
      }).catch( erro => this.errorHandlerService.handler(erro));
    }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function() {
      this.equipe = new Equipe();
      this.listarPessoas();
      this.pesquisarEncontreiros();
    }.bind(this), 1);

    this.router.navigate(['/equipes/novo']);
  }

}
