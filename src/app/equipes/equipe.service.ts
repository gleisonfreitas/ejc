import { AuthService } from './../seguranca/auth.service';
import { URLSearchParams, ResponseContentType } from '@angular/http';

import { Equipe } from './../core/model';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';

export class EquipeFiltro {
  codigo: number;
  codigoEjc: number;
  nome: string;
  coordenadorUm: string;
  coordenadorDois: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EquipeService {

  equipesUrl: string;

  constructor(
    private authService: AuthService,
    private http: AuthHttp) {
    this.equipesUrl = `${environment.apiUrl}/equipes`;
   }

  pesquisar(filtro: EquipeFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    params.set('codigoEjc', this.authService.jwtPayload.codigo_ejc);

    if ( filtro.nome ) {
      params.set('nome', filtro.nome);
    }

    if ( filtro.coordenadorUm ) {
      params.set('coordenadorUm', filtro.coordenadorUm);
    }

    if ( filtro.coordenadorDois ) {
      params.set('coordenadorDois', filtro.coordenadorDois);
    }

    return this.http.get( `${this.equipesUrl}?resumo`,  { search: params } )
      .toPromise()
      .then( response => {

        const equipes = response.json().content;

        const resultado = {
          equipes,
          total: response.json().totalElements
        };

        return resultado;
      });
    }

    listarNomesEquipes(): Promise<any> {

      return this.http.get(`${this.equipesUrl}/nomes`)
        .toPromise()
        .then( response => {
          return response.json();
        });
    }

    buscarPorCodigo(codigo: number): Promise<Equipe> {

      return this.http.get(`${this.equipesUrl}/${codigo}`)
        .toPromise()
        .then( response => {
          const equipe = response.json() as Equipe;
          return equipe;
        });
    }

    adicionar(equipe: Equipe): Promise<Equipe> {

      equipe.ejc.codigo =  this.authService.jwtPayload.codigo_ejc;

      return this.http.post(`${this.equipesUrl}`, JSON.stringify(equipe))
        .toPromise()
        .then( response => response.json());
    }

    atualizar(equipe: Equipe): Promise<Equipe> {

      return this.http.put(`${this.equipesUrl}/${equipe.codigo}`, JSON.stringify(equipe))
        .toPromise()
        .then( response => {

          const equipeAlterada = response.json() as Equipe;

          return equipeAlterada;
        });
    }

    excluir(codigo: number): Promise<void> {

      return this.http.delete(`${this.equipesUrl}/${codigo}`)
        .toPromise()
        .then( () => null);
    }

    visualizarAgenda(codigo: number): Promise<any> {

      const params = new URLSearchParams();

      params.set('codigoEjc', this.authService.jwtPayload.codigo_ejc);
      if (codigo) {
        params.set('codigo', codigo.toString());
      }

      return this.http.get( `${this.equipesUrl}/relatorios/agenda`,
        { search: params, responseType: ResponseContentType.Blob })
        .toPromise()
        .then( response => response.blob());
    }

    visualizarCamisas(): Promise<any> {

      const codigoEjc = this.authService.jwtPayload.codigo_ejc;

      return this.http.get( `${this.equipesUrl}/relatorios/camisas_por-equipe/${codigoEjc}`,
        { responseType: ResponseContentType.Blob })
        .toPromise()
        .then( response => response.blob());
    }

    visualizarAniversariantes(): Promise<any> {

      const codigoEjc = this.authService.jwtPayload.codigo_ejc;

      return this.http.get( `${this.equipesUrl}/relatorios/aniversariantes/${codigoEjc}`,
        { responseType: ResponseContentType.Blob })
        .toPromise()
        .then( response => response.blob());
    }

    visualizarCrachas(): Promise<any> {

      const codigoEjc = this.authService.jwtPayload.codigo_ejc;

      return this.http.get( `${this.equipesUrl}/relatorios/etiquetas_crachas/${codigoEjc}`,
        { responseType: ResponseContentType.Blob })
        .toPromise()
        .then( response => response.blob());
    }

}
