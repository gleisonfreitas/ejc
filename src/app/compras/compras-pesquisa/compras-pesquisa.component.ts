import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CompraFiltro, CompraService } from './../compra.service';

@Component({
  selector: 'app-compras-pesquisa',
  templateUrl: './compras-pesquisa.component.html',
  styleUrls: ['./compras-pesquisa.component.css']
})
export class ComprasPesquisaComponent implements OnInit {

  filtro = new CompraFiltro();
  totalRegistros: number;
  compras = [];
  @ViewChild('tabela') grid;

  constructor(
    private compraService: CompraService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmacaoService: ConfirmationService,
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.compraService.pesquisar(this.filtro)
      .then( resultado => {
        this.compras = resultado.compras;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(compra: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(compra);
      }
    });
  }

  excluir(compra: any) {

    this.compraService.excluir(compra.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Compra excluída com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  visualizarRelatorio() {
    this.compraService.visualizarRelatorio()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

}
