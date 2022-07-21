import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  lancamento = new Lancamento();
  tipos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listarTipo();

    this.title.setTitle('Novo Lançamento');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
  }

  listarTipo() {
    this.lancamentoService.listarTipos()
      .then( response => {
        this.tipos = response.map( t => ({ label: t.descricao, value: t.nome}));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }
  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  adicionarLancamento(form: FormControl) {

    this.lancamentoService.adicionar(this.lancamento)
      .then( () => {

        this.toastyService.success('Lançamento cadastrado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarLancamento(form: FormControl) {

    this.lancamentoService.atualizar(this.lancamento)
      .then( () => {

        this.toastyService.success('Lançamento atualizado com sucesso!');

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  buscarPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then( response => {
        this.lancamento = response;
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
