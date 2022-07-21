import { Injectable } from '@angular/core';
import { URLSearchParams, ResponseContentType } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Patrimonio } from './../core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';

import * as moment from 'moment';

export class PatrimonioFiltro {
  numeroSerie: string;
  descricao: string;
  estado: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PatrimonioService {

  patrimoniosUrl: string;

  constructor(
    private authService: AuthService,
    private http: AuthHttp) {
    this.patrimoniosUrl = `${environment.apiUrl}/patrimonios`;
  }

  pesquisar(filtro: PatrimonioFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    params.set('codigoIgreja', this.authService.jwtPayload.codigo_ejc);

    if ( filtro.numeroSerie ) {
      params.set('numeroSerie', filtro.numeroSerie);
    }

    if ( filtro.descricao ) {
      params.set('descricao', filtro.descricao);
    }

    if ( filtro.estado ) {
      params.set('estado', filtro.estado);
    }

    return this.http.get( `${this.patrimoniosUrl}?resumo`,  { search: params } )
      .toPromise()
      .then( response => {

        const patrimonios = response.json().content;

        const resultado = {
          patrimonios,
          total: response.json().totalElements
        };

        return resultado;
      });
    }

    listarEstadosConservacao(): Promise<any> {
      return this.http.get( `${this.patrimoniosUrl}/estadosConservacao`)
      .toPromise()
      .then( response => {
        return response.json();
      });
    }

    buscarPorCodigo(codigo: number): Promise<Patrimonio> {

      return this.http.get(`${this.patrimoniosUrl}/${codigo}`)
        .toPromise()
        .then( response => {
          const patrimonio = response.json() as Patrimonio;

          this.converterStringsParaDatas([patrimonio]);
          return patrimonio;
        });
    }

    adicionar(patrimonio: Patrimonio): Promise<Patrimonio> {

      patrimonio.igreja.codigo =  this.authService.jwtPayload.codigo_ejc;

      return this.http.post(`${this.patrimoniosUrl}`, JSON.stringify(patrimonio))
        .toPromise()
        .then( response => response.json());
    }

    private converterStringsParaDatas(patrimonios: Patrimonio[]) {
      for (const patrimonio of patrimonios) {
        patrimonio.dataCompra = moment(patrimonio.dataCompra,
          'YYYY-MM-DD').toDate();
      }
    }

    atualizar(patrimonio: Patrimonio): Promise<Patrimonio> {

      return this.http.put(`${this.patrimoniosUrl}/${patrimonio.codigo}`, JSON.stringify(patrimonio))
        .toPromise()
        .then( response => {

          const patrimonioAlterada = response.json() as Patrimonio;

          return patrimonioAlterada;
        });
    }

    excluir(codigo: number): Promise<void> {

      return this.http.delete(`${this.patrimoniosUrl}/${codigo}`)
        .toPromise()
        .then( () => null);
    }

    visualizarRelatorio(): Promise<any> {

      const codigoEjc = this.authService.jwtPayload.codigo_ejc;

      return this.http.get( `${this.patrimoniosUrl}/relatorios/${codigoEjc}`,
        { responseType: ResponseContentType.Blob })
        .toPromise()
        .then( response => response.blob());
    }

}
