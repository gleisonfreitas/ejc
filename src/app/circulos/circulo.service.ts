import { Injectable } from '@angular/core';
import { URLSearchParams, ResponseContentType } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';

import { Circulo } from './../core/model';
import { AuthService } from './../seguranca/auth.service';

export class CirculoFiltro {
  codigo: number;
  codigoEjc: number;
  cor: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CirculoService {

  circulosUrl: string;

  constructor(
    private authService: AuthService,
    private http: AuthHttp) {
    this.circulosUrl = `${environment.apiUrl}/circulos`;
  }

pesquisar(filtro: CirculoFiltro): Promise<any> {

  const params = new URLSearchParams();

  params.set('page', filtro.pagina.toString());
  params.set('size', filtro.itensPorPagina.toString());

  params.set('codigoEjc', this.authService.jwtPayload.codigo_ejc);

  return this.http.get( `${this.circulosUrl}?resumo`,  { search: params } )
    .toPromise()
    .then( response => {

      const circulos = response.json().content;

      const resultado = {
        circulos,
        total: response.json().totalElements
      };

      return resultado;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Circulo> {

    return this.http.get(`${this.circulosUrl}/${codigo}`)
      .toPromise()
      .then( response => {
        const circulo = response.json() as Circulo;
        return circulo;
      });
  }

  adicionar(circulo: Circulo): Promise<Circulo> {

    circulo.ejc.codigo =  this.authService.jwtPayload.codigo_ejc;

    return this.http.post(`${this.circulosUrl}`, JSON.stringify(circulo))
      .toPromise()
      .then( response => response.json());
  }

  atualizar(circulo: Circulo): Promise<Circulo> {

    return this.http.put(`${this.circulosUrl}/${circulo.codigo}`, JSON.stringify(circulo))
      .toPromise()
      .then( response => {

        const circuloAlterado = response.json() as Circulo;

        return circuloAlterado;
      });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.circulosUrl}/${codigo}`)
      .toPromise()
      .then( () => null);
  }

  listarCores(): Promise<any> {
    return this.http.get( `${this.circulosUrl}/cores`)
    .toPromise()
    .then( response => {

      return response.json()
    })
  }

  visualizarAgenda(codigo: number): Promise<any> {

    const params = new URLSearchParams();

    params.set('codigoEjc', this.authService.jwtPayload.codigo_ejc);
    if (codigo) {
      params.set('codigo', codigo.toString());
    }

    return this.http.get( `${this.circulosUrl}/relatorios/agenda`,
      { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then( response => response.blob());
  }

  visualizarCamisas(): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    return this.http.get( `${this.circulosUrl}/relatorios/camisas_por-circulo/${codigoEjc}`,
      { responseType: ResponseContentType.Blob })
      .toPromise()
      .then( response => response.blob());
  }

  visualizarAniversariantes(): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    return this.http.get( `${this.circulosUrl}/relatorios/aniversariantes/${codigoEjc}`,
      { responseType: ResponseContentType.Blob })
      .toPromise()
      .then( response => response.blob());
  }

  visualizarCrachas(): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    return this.http.get( `${this.circulosUrl}/relatorios/etiquetas_crachas/${codigoEjc}`,
      { responseType: ResponseContentType.Blob })
      .toPromise()
      .then( response => response.blob());
  }

  visualizarEtiquetas(): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    return this.http.get( `${this.circulosUrl}/relatorios/etiquetas_sacolas/${codigoEjc}`,
      { responseType: ResponseContentType.Blob })
      .toPromise()
      .then( response => response.blob());
  }
}
