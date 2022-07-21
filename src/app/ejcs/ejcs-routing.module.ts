import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EjcsCadastroComponent } from './ejcs-cadastro/ejcs-cadastro.component';
import { EjcsPesquisaComponent } from './ejcs-pesquisa/ejcs-pesquisa.component';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EjcsPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EJC'] }
  },
  {
    path: 'novo',
    component: EjcsCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EJC'] }
  },
  {
    path: ':codigo',
    component: EjcsCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_EJC'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EjcsRoutingModule { }
