import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';

import { Pessoa, Estado, Cidade } from './../core/model';

import * as moment from 'moment';

export class PessoaFiltro {
  nome: string;
  trabalhando: Boolean;
  encontreiro: Boolean;
  encontrista: Boolean;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

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

    if ( filtro.trabalhando !== null) {
      params.set('trabalhando', filtro.trabalhando.toString() );
    }

    if ( filtro.encontreiro !== null) {
      params.set('encontreiro', filtro.encontreiro.toString() );
    }

    if ( filtro.encontrista !== null) {
      params.set('encontrista', filtro.encontrista.toString() );
    }

    return this.http.get( `${this.pessoasUrl}?resumo`,  { search: params } )
      .toPromise()
      .then( response => {

        const pessoas = response.json().content;

        const resultado = {
          pessoas,
          total: response.json().totalElements
        };

        return resultado;
      });
    }

    buscarPorCodigo(codigo: number): Promise<Pessoa> {

      return this.http.get(`${this.pessoasUrl}/${codigo}`)
        .toPromise()
        .then( response => {
          const pessoa = response.json() as Pessoa;

          this.converterStringsParaDatas([pessoa]);

          return pessoa;
        });
    }

    private converterStringsParaDatas(pessoas: Pessoa[]) {
      for (const pessoa of pessoas) {
        pessoa.dataNasc = moment(pessoa.dataNasc,
          'YYYY-MM-DD').toDate();
      }
    }

    listarTodas(): Promise<any> {

      return this.http.get( `${this.pessoasUrl}?resumo`)
        .toPromise()
        .then( response => response.json().content);
    }

    listarEncontristaDisponiveis(): Promise<any> {

      return this.http.get( `${this.pessoasUrl}/encontristas/disponiveis`)
        .toPromise()
        .then( response => response.json());
    }

    listarEncontreiroDisponiveis(): Promise<any> {

       return this.http.get( `${this.pessoasUrl}/encontreiros/disponiveis`)
        .toPromise()
        .then( response => response.json());
    }

    excluir(codigo: number): Promise<void> {

      return this.http.delete(`${this.pessoasUrl}/${codigo}`)
        .toPromise()
        .then( () => null);
    }

    ativar(pessoa: any): Promise<void> {

      return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}/ativo`, !pessoa.ativo)
        .toPromise()
        .then( () => null);
    }

    adicionar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.post(`${this.pessoasUrl}`, JSON.stringify(pessoa))
        .toPromise()
        .then( response => response.json());
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
        .toPromise()
        .then( response => {

          const pessoaAlterado = response.json() as Pessoa;

          return pessoaAlterado;
        });
    }

    listarEstado(): Promise<Estado[]> {
      return this.http.get(this.estadosUrl)
        .toPromise()
        .then( response => response.json());
    }

    pesquisarCidade(codigoEstado): Promise<Cidade[]> {

      const params = new URLSearchParams();

      params.set('codigoEstado', codigoEstado);

      return this.http.get(this.cidadesUrl, { search: params})
        .toPromise()
        .then( response => response.json());
    }

    pesquisarCoordenadores(): Promise<any> {
      return this.http.get(`${this.pessoasUrl}/coordenadores`)
        .toPromise()
        .then( response => response.json());
    }

    pesquisarEdgs(): Promise<any> {
      return this.http.get(`${this.pessoasUrl}/edgs`)
        .toPromise()
        .then( response => response.json());
    }

    pesquisarDirigentesCirculos(): Promise<any> {
      return this.http.get(`${this.pessoasUrl}/dirigentes`)
        .toPromise()
        .then( response => response.json());
    }
}
