import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  totalRegistros: number;
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmacaoService: ConfirmationService,
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then( resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Lançamento excluído com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  visualizarRelatorio() {

    this.lancamentoService.visualizarRelDetalhado()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

}
