import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';

import { PatrimoniosCadastroComponent } from './patrimonios-cadastro/patrimonios-cadastro.component';
import { PatrimoniosPesquisaComponent } from './patrimonios-pesquisa/patrimonios-pesquisa.component';



const routes: Routes = [
  {
    path: '',
    component: PatrimoniosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PATRIMONIO'] }
  },
  {
    path: 'novo',
    component: PatrimoniosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PATRIMONIO'] }
  },
  {
    path: ':codigo',
    component: PatrimoniosCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_PATRIMONIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PatrimoniosRoutingModule { }
