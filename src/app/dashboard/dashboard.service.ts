import { URLSearchParams } from '@angular/http';
import { AuthService } from './../seguranca/auth.service';
import { LancamentoFiltro } from './../lancamentos/lancamento.service';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';

import * as moment from 'moment';

@Injectable()
export class DashboardService {

  circulosUrl: string
  equipesUrl: string;
  lancamentosUrl: string;

  constructor(
    private authHttp: AuthHttp,
    private authService: AuthService,
  ) {
    this.circulosUrl = `${environment.apiUrl}/circulos`;
    this.equipesUrl = `${environment.apiUrl}/equipes`;
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorTipoDia(tipo: string): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    const params = new URLSearchParams();

    params.set('codigoEjc', codigoEjc);
    params.set('tipo', tipo);

    return this.authHttp.get(
      `${this.lancamentosUrl}/relatorios/estatistica_lancamento_resumo_dia`,
      { search: params} )
      .toPromise()
      .then( response => {

        const dados = response.json();

        dados.forEach(dado => {
          dado.data = moment(dado.data, 'YYYY-MM-DD').toDate();
          dado.data = moment(dado.data).format('DD/MM');
        });

        return dados;
      });
  }

  lancamentosPorTipo(): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    const params = new URLSearchParams();

    params.set('codigoEjc', codigoEjc);

    return this.authHttp.get(
      `${this.lancamentosUrl}/relatorios/estatistica_lancamento_resumo`,
      { search: params} )
      .toPromise()
      .then( response => response.json());
  }

  totalPorEquipe(codigoEjc: number): Promise<any> {
    return this.authHttp.get(`${this.equipesUrl}/estatistica/por-equipe/${codigoEjc}`)
      .toPromise()
      .then( response => response.json());
  }

  totalPorCirculo(codigoEjc: number): Promise<any> {
    return this.authHttp.get(`${this.circulosUrl}/estatistica/por-circulo/${codigoEjc}`)
      .toPromise()
      .then( response => response.json());
  }

}
