import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';

import { CirculosCadastroComponent } from './circulos-cadastro/circulos-cadastro.component';
import { CirculosPesquisaComponent } from './circulos-pesquisa/circulos-pesquisa.component';


const routes: Routes = [
  {
    path: '',
    component: CirculosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CIRCULO'] }
  },
  {
    path: 'novo',
    component: CirculosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CIRCULO'] }
  },
  {
    path: ':codigo',
    component: CirculosCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_CIRCULO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CirculosRoutingModule { }
