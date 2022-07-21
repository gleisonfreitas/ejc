import { AuthService } from './../seguranca/auth.service';
import { Edg } from './../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class EdgService {

  edgUrl: string;

  constructor(
    private http: AuthHttp,
    private authService: AuthService,
  ) {
    this.edgUrl = `${environment.apiUrl}/edg`;
   }

  listarTodas(): Promise<any> {

    const codigoEjc = this.authService.jwtPayload.codigo_ejc;

    return this.http.get( `${this.edgUrl}/${codigoEjc}`)
      .toPromise()
      .then( response => response.json());
  }

  listarFuncoes(): Promise<any> {
    return this.http.get( `${this.edgUrl}/funcoes`)
    .toPromise()
    .then( response => response.json());
  }

  adicionar(edg: Edg): Promise<Edg> {

    edg.ejc.codigo =  this.authService.jwtPayload.codigo_ejc;

    return this.http.post(`${this.edgUrl}`, JSON.stringify(edg))
      .toPromise()
      .then( response => response.json());
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.edgUrl}/${codigo}`)
      .toPromise()
      .then( () => null);
  }

}
