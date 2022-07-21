import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';

@Injectable()
export class PermissaoService {

  permissaoUrl: string;

  constructor(private http: AuthHttp) {
    this.permissaoUrl = `${environment.apiUrl}/permissoes`;
  }

  listarTodos(): Promise<any> {

    return this.http.get(`${this.permissaoUrl}`)
      .toPromise()
      .then( response => response.json());
  }
}
