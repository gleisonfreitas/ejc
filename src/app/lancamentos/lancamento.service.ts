import { URLSearchParams, ResponseContentType } from '@angular/http';
import { Lancamento } from './../core/model';
import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../seguranca/auth.service';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

export class LancamentoFiltro {
  codigoEjc: number;
  tipo: string;
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

    constructor(
      private authService: AuthService,
      private http: AuthHttp) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    }

    pesquisar(filtro: LancamentoFiltro): Promise<any> {

      const params = new URLSearchParams();

      params.set('page', filtro.pagina.toString());
      params.set('size', filtro.itensPorPagina.toString());

      params.set('codigoEjc', this.authService.jwtPayload.codigo_ejc);

      if ( filtro.descricao ) {
        params.set('descricao', filtro.descricao);
      }

      return this.http.get( `${this.lancamentosUrl}?resumo`,  { search: params } )
        .toPromise()
        .then( response => {

          const lancamentos = response.json().content;

          const resultado = {
            lancamentos,
            total: response.json().totalElements
          };

          return resultado;
        });
      }

      listarTipos(): Promise<any> {
        return this.http.get( `${this.lancamentosUrl}/tipos`)
        .toPromise()
        .then( response => {
          return response.json();
        });
      }

      buscarPorCodigo(codigo: number): Promise<Lancamento> {

        return this.http.get(`${this.lancamentosUrl}/${codigo}`)
          .toPromise()
          .then( response => {
            const lancamento = response.json() as Lancamento;

            this.converterStringsParaDatas([lancamento]);

            return lancamento;
          });
      }

      private converterStringsParaDatas(lancamentos: Lancamento[]) {
        for (const lancamento of lancamentos) {
          lancamento.data = moment(lancamento.data,
            'YYYY-MM-DD').toDate();
        }
      }

      adicionar(lancamento: Lancamento): Promise<Lancamento> {

        lancamento.ejc.codigo =  this.authService.jwtPayload.codigo_ejc;

        return this.http.post(`${this.lancamentosUrl}`, JSON.stringify(lancamento))
          .toPromise()
          .then( response => response.json());
      }

      atualizar(lancamento: Lancamento): Promise<Lancamento> {

        return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento))
          .toPromise()
          .then( response => {

            const lancamentoAlterada = response.json() as Lancamento;

            return lancamentoAlterada;
          });
      }

      excluir(codigo: number): Promise<void> {

        return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
          .toPromise()
          .then( () => null);
      }

      visualizarRelDetalhado(): Promise<any> {

        const codigoEjc = this.authService.jwtPayload.codigo_ejc;

        return this.http.get( `${this.lancamentosUrl}/relatorios/estatistica_lancamento/${codigoEjc}`,
          { responseType: ResponseContentType.Blob })
          .toPromise()
          .then( response => response.blob());
      }

}
