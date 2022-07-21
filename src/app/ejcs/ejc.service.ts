import { Ejc } from './../core/model';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';

import * as moment from 'moment';

export class EjcFiltro {
  igreja: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EjcService {

  ejcsUrl: string;

  constructor(
    private authService: AuthService,
    private http: AuthHttp) {
    this.ejcsUrl = `${environment.apiUrl}/ejcs`;
  }

  pesquisar(filtro: EjcFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if ( filtro.igreja ) {
      params.set('igreja', filtro.igreja);
    }

    return this.http.get( `${this.ejcsUrl}?resumo`,  { search: params } )
      .toPromise()
      .then( response => {

        const ejcs = response.json().content;

        const resultado = {
          ejcs,
          total: response.json().totalElements
        };

        return resultado;
    });
  }

  listarAtivos(): Promise<any> {

   return this.http.get(`${this.ejcsUrl}/ativos`)
      .toPromise()
      .then( response => {
        return response.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Ejc> {

    return this.http.get(`${this.ejcsUrl}/${codigo}`)
      .toPromise()
      .then( response => {
        const ejc = response.json() as Ejc;

        this.converterStringsParaDatas([ejc]);

        return ejc;
    });
  }

  adicionar(ejc: Ejc): Promise<Ejc> {

    return this.http.post(`${this.ejcsUrl}`, JSON.stringify(ejc))
      .toPromise()
      .then( response => response.json());
  }

  atualizar(ejc: Ejc): Promise<Ejc> {

    return this.http.put(`${this.ejcsUrl}/${ejc.codigo}`, JSON.stringify(ejc))
      .toPromise()
      .then( response => {

        const ejcAlterado = response.json() as Ejc;

        return ejcAlterado;
      });
  }

    excluir(codigo: number): Promise<void> {

      return this.http.delete(`${this.ejcsUrl}/${codigo}`)
        .toPromise()
        .then( () => null);
    }

  private converterStringsParaDatas(ejcs: Ejc[]) {
    for (const ejc of ejcs) {
      ejc.inicio = moment(ejc.inicio,
        'YYYY-MM-DD').toDate();

      ejc.fim = moment(ejc.fim,
        'YYYY-MM-DD').toDate();
    }
  }

  ativar(ejc: any): Promise<void> {

    return this.http.put(`${this.ejcsUrl}/${ejc.codigo}/ativo`, !ejc.ativo)
      .toPromise()
      .then( () => null);
  }

  aploadLogo(codigo: number) {
    return `${this.ejcsUrl}/upload/${codigo}`;
  }

}
