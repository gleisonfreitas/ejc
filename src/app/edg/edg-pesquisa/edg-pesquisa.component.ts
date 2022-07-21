import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { PessoaFiltro, PessoaService } from './../../pessoas/pessoa.service';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EdgService } from './../edg.service';
import { Edg } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edg-pesquisa',
  templateUrl: './edg-pesquisa.component.html',
  styleUrls: ['./edg-pesquisa.component.css']
})
export class EdgPesquisaComponent implements OnInit {

  edg = new Edg();
  exibindoDialogEdg = false;
  listaEdg = [];
  funcoes = [];
  pessoas = [];

  constructor(
    private edgService: EdgService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private confirmacaoService: ConfirmationService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {

    this.listar();
    this.listarFuncoes();
    this.pesquisarPessoas();
  }

  prepararNovoEdg() {
    this.exibindoDialogEdg = true;
    this.edg = new Edg();
  }

  confirmarEdg(frm: FormControl) {

    this.edgService.adicionar(this.edg)
      .then( () => {
        this.listar();
        this.toastyService.success('Pessoa adicionada na EDG com sucesso.');
      });
    this.exibindoDialogEdg = false;
    frm.reset();
  }

  listar() {
    this.edgService.listarTodas()
      .then( response => {
        this.listaEdg = response;
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  listarFuncoes() {
    this.edgService.listarFuncoes()
      .then( response => {
        this.funcoes = response.map( f => ({ label: f.descricao, value: f.nome}));
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  pesquisarPessoas() {

    this.pessoaService.pesquisarEdgs()
      .then( resultado => {
        this.pessoas = resultado.map(p => ({label: p.nome, value: p.codigo}));
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  confirmarExclusao(edg: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(edg);
      }
    });
  }

  excluir(edg: any) {

    this.edgService.excluir(edg.codigo)
      .then( () => {
          this.listar();
        this.toastyService.success('Pessoa excluída da EDG com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }



}
