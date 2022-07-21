import { Igreja } from './../core/model';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';


export class IgrejaFiltro {
  nome: string;
  pastor: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class IgrejaService {

  igrejasUrl: string;

  constructor(private http: AuthHttp) {
    this.igrejasUrl = `${environment.apiUrl}/igrejas`;
  }

  pesquisar(filtro: IgrejaFiltro): Promise<any> {

    const params = new URLSearchParams();

    if ( filtro.pagina ) {
      params.set('page', filtro.pagina.toString());
    }

    if (filtro.itensPorPagina) {
      params.set('size', filtro.itensPorPagina.toString());
    }

    if ( filtro.nome ) {
      params.set('nome', filtro.nome);
    }

    if ( filtro.pastor ) {
      params.set('pastor', filtro.pastor);
    }

    return this.http.get( `${this.igrejasUrl}`,  { search: params } )
      .toPromise()
      .then( response => {

        const igrejas = response.json().content;

        const resultado = {
          igrejas,
          total: response.json().totalElements
        };

        return resultado;
    });
  }

  listarTodas(): Promise<any> {
    return this.http.get( `${this.igrejasUrl}`)
      .toPromise()
      .then( response => {

        const igrejas = response.json().content;

        const resultado = {
          igrejas,
          total: response.json().totalElements
        };

        return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.igrejasUrl}/${codigo}`)
      .toPromise()
      .then( () => null);
  }

  buscarPorCodigo(codigo: number): Promise<Igreja> {

    return this.http.get(`${this.igrejasUrl}/${codigo}`)
      .toPromise()
      .then( response => {
        const igreja = response.json() as Igreja;

        return igreja;
      });
  }

  adicionar(igreja: Igreja): Promise<Igreja> {

    return this.http.post(`${this.igrejasUrl}`, JSON.stringify(igreja))
      .toPromise()
      .then( response => response.json());
  }

  atualizar(igreja: Igreja): Promise<Igreja> {

    return this.http.put(`${this.igrejasUrl}/${igreja.codigo}`, JSON.stringify(igreja))
      .toPromise()
      .then( response => {

        const igrejaAlterado = response.json() as Igreja;

        return igrejaAlterado;
      });
  }

  aploadLogo(codigo: number) {
    return `${this.igrejasUrl}/upload/${codigo}`;
  }

}
