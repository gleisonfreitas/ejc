import { Injectable } from '@angular/core';
import { URLSearchParams, ResponseContentType } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';

import { Compra } from './../core/model';


export class CompraFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CompraService {

  comprasUrl: string;

  constructor(
    private authService: AuthService,
    private http: AuthHttp) {
    this.comprasUrl = `${environment.apiUrl}/compras`;
  }

  pesquisar(filtro: CompraFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    params.set('codigoEjc', this.authService.jwtPayload.codigo_ejc);

    if ( filtro.descricao ) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get( `${this.comprasUrl}?resumo`,  { search: params } )
      .toPromise()
      .then( response => {

        const compras = response.json().content;

        const resultado = {
          compras,
          total: response.json().totalElements
        };

        return resultado;
      });
    }

    listarUnidades(): Promise<any> {
      return this.http.get( `${this.comprasUrl}/unidades`)
      .toPromise()
      .then( response => {
        return response.json();
      });
    }

    buscarPorCodigo(codigo: number): Promise<Compra> {

      return this.http.get(`${this.comprasUrl}/${codigo}`)
        .toPromise()
        .then( response => {
          const compra = response.json() as Compra;
          return compra;
        });
    }

    adicionar(compra: Compra): Promise<Compra> {

      compra.ejc.codigo =  this.authService.jwtPayload.codigo_ejc;

      return this.http.post(`${this.comprasUrl}`, JSON.stringify(compra))
        .toPromise()
        .then( response => response.json());
    }

    atualizar(compra: Compra): Promise<Compra> {

      return this.http.put(`${this.comprasUrl}/${compra.codigo}`, JSON.stringify(compra))
        .toPromise()
        .then( response => {

          const compraAlterada = response.json() as Compra;

          return compraAlterada;
        });
    }

    excluir(codigo: number): Promise<void> {

      return this.http.delete(`${this.comprasUrl}/${codigo}`)
        .toPromise()
        .then( () => null);
    }

    visualizarRelatorio(): Promise<any> {

      const codigoEjc = this.authService.jwtPayload.codigo_ejc;

      return this.http.get( `${this.comprasUrl}/relatorios/${codigoEjc}`,
        { responseType: ResponseContentType.Blob })
        .toPromise()
        .then( response => response.blob());
    }

}
