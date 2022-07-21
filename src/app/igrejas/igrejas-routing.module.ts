import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IgrejasCadastroComponent } from './igrejas-cadastro/igrejas-cadastro.component';
import { IgrejasPesquisaComponent } from './igrejas-pesquisa/igrejas-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: IgrejasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_IGREJA'] }
  },
  {
    path: 'novo',
    component: IgrejasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_IGREJA'] }
  },
  {
    path: ':codigo',
    component: IgrejasCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_IGREJA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class IgrejasRoutingModule { }
