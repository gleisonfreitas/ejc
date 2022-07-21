import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PatrimonioFiltro, PatrimonioService } from './../patrimonio.service';

@Component({
  selector: 'app-patrimonios-pesquisa',
  templateUrl: './patrimonios-pesquisa.component.html',
  styleUrls: ['./patrimonios-pesquisa.component.css']
})
export class PatrimoniosPesquisaComponent implements OnInit {

  filtro = new PatrimonioFiltro();
  totalRegistros: number;
  patrimonios = [];
  estadosConservacao = [];
  @ViewChild('tabela') grid;

  constructor(
    private patrimonioService: PatrimonioService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmacaoService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.listarEstadosConversacao();
  }

  listarEstadosConversacao() {
    this.patrimonioService.listarEstadosConservacao()
      .then( response => {
        this.estadosConservacao = response.map( u => ({ label: u.descricao, value: u.nome}));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.patrimonioService.pesquisar(this.filtro)
      .then( resultado => {
        this.patrimonios = resultado.patrimonios;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(patrimonio: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(patrimonio);
      }
    });
  }

  excluir(patrimonio: any) {

    this.patrimonioService.excluir(patrimonio.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Patrimônio excluído com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  visualizarRelatorio() {
    this.patrimonioService.visualizarRelatorio()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

}
