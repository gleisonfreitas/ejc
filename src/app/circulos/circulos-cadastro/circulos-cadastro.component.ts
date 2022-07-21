import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CirculoService } from './../circulo.service';
import { PessoaFiltro, PessoaService } from './../../pessoas/pessoa.service';
import { Circulo, Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circulos-cadastro',
  templateUrl: './circulos-cadastro.component.html',
  styleUrls: ['./circulos-cadastro.component.css']
})
export class CirculosCadastroComponent implements OnInit {

  circulo = new Circulo();
  pessoas = [];
  filtro = new PessoaFiltro();
  pessoasDisponiveis = [];
  cores = [];

  constructor(
    private pessoaService: PessoaService,
    private circuloService: CirculoService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit(
  ) {
    this.listarPessoas();
    this.pesquisarEncontristas();
    this.listarCores();

    this.title.setTitle('Novo Círculo');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
  }

  listarCores() {
    this.circuloService.listarCores()
      .then( response => {
        this.cores = response.map(c => ({ label: c.nomeCor, value: c.corEnum }));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  buscarPorCodigo(codigo: number) {
    this.circuloService.buscarPorCodigo(codigo)
      .then( response => {
        this.circulo = response;
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de círculo: ${this.circulo.cor}`);
  }

  get editando() {
    return Boolean(this.circulo.codigo);
  }

  pesquisarPessoas(pessoas: any) {
    this.pessoaService.listarEncontristaDisponiveis()
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

  pesquisarEncontristas() {
    this.pessoasDisponiveis = [];

    this.pesquisarPessoas(this.pessoasDisponiveis);

  }

  listarPessoas() {

    this.pessoaService.pesquisarDirigentesCirculos()
    .then( resultado => {
      this.pessoas = resultado.map( p => ({ label: p.nome, value: p.codigo}));
    })
    .catch( erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCirculo(form);
    } else {
      this.adicionarCirculo(form);
    }
  }

  adicionarCirculo(form: FormControl) {

    this.spinnerService.show();
    this.circuloService.adicionar(this.circulo)
      .then( () => {
        this.spinnerService.hide();
        this.toastyService.success('Círculo cadastrado com sucesso!');
        this.novo(form);
      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarCirculo(form: FormControl) {

    this.spinnerService.show();
    this.circuloService.atualizar(this.circulo)
      .then( () => {
        this.spinnerService.hide();
        this.toastyService.success('Círculo atualizado com sucesso!');
      }).catch(erro => this.errorHandlerService.handler(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.circulo = new Circulo();
      this.listarPessoas();
    }.bind(this), 1);

    this.router.navigate(['/circulos', 'novo']);
  }

}
