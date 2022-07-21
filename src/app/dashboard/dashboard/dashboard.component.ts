import { AuthService } from './../../seguranca/auth.service';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  circulos = [];
  equipes = [];
  totalCirculo = 0;
  totalEquipe = 0;
  pieChartData: any;
  barChartData: any;
  lineChartData: any;
  barChartLancamentoData: any;


  constructor(
    public authService: AuthService,
    private dashboardService: DashboardService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.configurarGraficoCirculosPizza();
    this.configurarGraficoEquipeBar();

    if (this.authService.temPermissao('ROLE_PESQUISAR_LANCAMENTO')) {
      this.configurarGraficoLancamentoTipoDia();
      this.configurarGraficoLancamentoBar();
    }
  }

  configurarGraficoCirculosPizza() {

    this.dashboardService.totalPorCirculo(this.authService.jwtPayload.codigo_ejc)
      .then( response => {
        this.circulos = response;
        this.circulos.forEach( c => this.totalCirculo = this.totalCirculo + c.total);
        this.pieChartData = {
          labels: response.map( dado => dado.nomeCor),
          datasets: [
            {
              data: response.map( dado => dado.total),
              backgroundColor: response.map( dado => dado.hex),
            }
          ]

        }
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  configurarGraficoEquipeBar() {
    this.dashboardService.totalPorEquipe(this.authService.jwtPayload.codigo_ejc)
      .then( response => {
        this.equipes = response;
        this.equipes.forEach( e => this.totalEquipe = this.totalEquipe + e.total);
        this.barChartData = {
          labels: response.map( dado => dado.nomeEquipe ),
          datasets: [
              {
                  label: 'Total',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: response.map( dado => dado.total )
              }
          ]
        }
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  configurarGraficoLancamentoTipoDia() {

    this.dashboardService.lancamentosPorTipoDia('RECEITA')
      .then( response => {
        this.lineChartData = {
          labels: response.map( dado => dado.data),
          datasets: [
            {
              label: 'RECEITA',
              data: response.map(dado => dado.valor),
              fill: false,
              borderColor: '#4bc0c0'
            }
          ]
        }
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  configurarGraficoLancamentoBar() {
    this.dashboardService.lancamentosPorTipo()
      .then( response => {
        this.barChartLancamentoData = {
          labels: response.map( dado => dado.tipo ),
          datasets: [
              {
                  label: 'TOTAL',
                  backgroundColor: '#9CCC65',
                  borderColor: '#7CB342',
                  data: response.map( dado => dado.valor )
              }
          ]
      }
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

}
