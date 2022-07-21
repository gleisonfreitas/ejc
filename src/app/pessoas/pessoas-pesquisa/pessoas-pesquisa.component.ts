import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  tipo = null;
  tipos = [
    {label: 'Selecione..', value: null},
    {label: 'ENCONTREIRO', value: true },
    {label: 'ENCONTRISTA', value: false}
  ];

  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;


  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private confirmacaoService: ConfirmationService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.trabalhando = null;
    this.filtro.encontreiro = null;
    this.filtro.encontrista = null;

    if (this.tipo != null) {
      if (this.tipo) {
        this.filtro.encontreiro = true;
      } else {
        this.filtro.encontrista = true;
      }
    }
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then( resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Pessoa excluída com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

}
