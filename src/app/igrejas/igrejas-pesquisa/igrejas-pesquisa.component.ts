import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { IgrejaFiltro, IgrejaService } from './../igreja.service';

import { Igreja } from './../../core/model';

@Component({
  selector: 'app-igrejas-pesquisa',
  templateUrl: './igrejas-pesquisa.component.html',
  styleUrls: ['./igrejas-pesquisa.component.css']
})
export class IgrejasPesquisaComponent implements OnInit {

  filtro = new IgrejaFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  igrejas = new Array<Igreja>();

  constructor(
    private igrejaService: IgrejaService,
    private errorHandlerService: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
  ) { }

  ngOnInit() {
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {

    this.igrejaService.pesquisar(this.filtro)
      .then( resultado => {
        this.igrejas = resultado.igrejas;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  confirmarExclusao(igreja: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(igreja);
      }
    });
  }

  excluir(igreja: any) {

    this.igrejaService.excluir(igreja.codigo)
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
