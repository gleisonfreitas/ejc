import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EjcFiltro, EjcService } from './../ejc.service';

@Component({
  selector: 'app-ejcs-pesquisa',
  templateUrl: './ejcs-pesquisa.component.html',
  styleUrls: ['./ejcs-pesquisa.component.css']
})
export class EjcsPesquisaComponent implements OnInit {

  filtro = new EjcFiltro();

  totalRegistros = 0;
  @ViewChild('tabela') grid;

  ejcs = [];

  constructor(
    private ejcService: EjcService,
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

    this.ejcService.pesquisar(this.filtro)
      .then( resultado => {
        this.ejcs = resultado.ejcs;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  confirmarExclusao(ejc: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(ejc);
      }
    });
  }

  excluir(ejc: any) {

    this.ejcService.excluir(ejc.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('EJC excluído com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  confirmarAtivarOuDesativa(ejc: any) {

    let msg;
    if (ejc.ativo) {
      msg = 'Tem certeza que desativar o EJC.'
    } else {
      msg = 'Tem certeza que ativar o EJC.'
    }
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        this.ativarOuDesativa(ejc);
      }
    });
  }

  ativarOuDesativa(ejc: any) {

    let msg;
    if (ejc.ativo) {
      msg = 'EJC desativado com sucesso!';
    } else {
      msg = 'EJC ativado com sucesso!';
    }

    this.ejcService.ativar(ejc)
    .then( () => {
      this.pesquisar();
      this.toastyService.success(msg);
    })
    .catch( error => this.errorHandlerService.handler(error));
  }

}
