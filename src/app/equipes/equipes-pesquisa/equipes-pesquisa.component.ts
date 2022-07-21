import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EquipeFiltro, EquipeService } from './../equipe.service';

@Component({
  selector: 'app-equipes-pesquisa',
  templateUrl: './equipes-pesquisa.component.html',
  styleUrls: ['./equipes-pesquisa.component.css']
})
export class EquipesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new EquipeFiltro();
  equipes = [];
  nomesEquipe = [];
  @ViewChild('tabela') grid;

  constructor(
    private equipeService: EquipeService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmacaoService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.listarNomesEquipes();
  }

  listarNomesEquipes() {
    this.equipeService.listarNomesEquipes()
      .then( response => {
        this.nomesEquipe = response.map( e => ({ label: e.descricao, value: e.nome }));
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.equipeService.pesquisar(this.filtro)
      .then( resultado => {
        this.equipes = resultado.equipes;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(equipe: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluír.',
      accept: () => {
        this.excluir(equipe);
      }
    });
  }

  excluir(equipe: any) {

    this.equipeService.excluir(equipe.codigo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Equipe excluída com sucesso.');
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

  visualizarAgenda(codigo: number) {

    this.equipeService.visualizarAgenda(codigo)
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarCamisas() {

    this.equipeService.visualizarCamisas()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarAniversariantes() {

    this.equipeService.visualizarAniversariantes()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

  visualizarCrachas() {

    this.equipeService.visualizarCrachas()
    .then( relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    })
    .catch(erro => this.errorHandlerService.handler(erro));
  }

}
