import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EdgPesquisaComponent } from './edg-pesquisa/edg-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EdgPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EDG'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EdgRoutingModule { }
