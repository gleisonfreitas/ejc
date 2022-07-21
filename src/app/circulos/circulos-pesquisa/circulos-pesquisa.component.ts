import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CirculoFiltro, CirculoService } from './../circulo.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circulos-pesquisa',
  templateUrl: './circulos-pesquisa.component.html',
  styleUrls: ['./circulos-pesquisa.component.css']
})
export class CirculosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CirculoFiltro();
  circulos = [];
  cores = [];
  @ViewChild('tabela') grid;

  constructor(
    private circuloService: CirculoService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmacaoService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.listarCores();
    this.pesquisar();
  }

  listarCores() {
    this.circuloService.listarCores()
      .then( response => {
        this.cores = response.map(c => ({ label: c.nomeCor, value: c.corEnum }));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.circuloService.pesquisar(this.filtro)
      .then( resultado => {
        this.circulos = resultado.circulos;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(circulo: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(circulo);
      }
    });
  }

  excluir(circulo: any) {

    this.circuloService.excluir(circulo.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Circulo excluído com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  visualizarAgenda(codigo: number) {

    this.circuloService.visualizarAgenda(codigo)
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarCamisas() {

    this.circuloService.visualizarCamisas()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarAniversariantes() {

    this.circuloService.visualizarAniversariantes()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarCrachas() {

    this.circuloService.visualizarCrachas()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarEtiquetas() {

    this.circuloService.visualizarEtiquetas()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

}
