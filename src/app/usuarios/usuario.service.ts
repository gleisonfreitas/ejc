import { Usuario } from './../core/model';
import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class UsuarioFiltro {
  nome: string;
  email: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class RequisicaoAlteracaoSenha {
  email: string;
  senhaAtual: string;
  novaSenha: string;
}

@Injectable()
export class UsuarioService {

  usuarioUrl: string;

  constructor(private http: AuthHttp) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  alterarSenha(requisicao: RequisicaoAlteracaoSenha): Promise<any> {

    return this.http.put(`${this.usuarioUrl}`, JSON.stringify(requisicao))
      .toPromise()
      .then( response => response.json());
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.email) {
      params.set('email', filtro.email);
    }

    return this.http.get(`${this.usuarioUrl}`, {search: params})
      .toPromise()
      .then( response => {

        const responseJson = response.json();
        const usuarios = responseJson.content;
        const total = responseJson.totalElements;

        const resultado = {
          usuarios,
          total
        };

        return resultado;
      });
  }

  listarTodos(): Promise<any> {

    return this.http.get(`${this.usuarioUrl}`)
      .toPromise()
      .then( response => {

        const responseJson = response.json();
        const usuarios = responseJson.content;

        return usuarios;
      });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then( () => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post(`${this.usuarioUrl}`, JSON.stringify(usuario))
      .toPromise()
      .then( response => response.json());
  }

  atualizar(usuario: Usuario): Promise<Usuario> {

    return this.http.put(`${this.usuarioUrl}/${usuario.codigo}`, JSON.stringify(usuario))
      .toPromise()
      .then(  response => response.json() );
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {

    return this.http.get(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then( response => response.json());
  }

}
