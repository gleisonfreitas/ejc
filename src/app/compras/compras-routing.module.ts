import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';

import { ComprasCadastroComponent } from './compras-cadastro/compras-cadastro.component';
import { ComprasPesquisaComponent } from './compras-pesquisa/compras-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_COMPRA'] }
  },
  {
    path: 'novo',
    component: ComprasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_COMPRA'] }
  },
  {
    path: ':codigo',
    component: ComprasCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_COMPRA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
