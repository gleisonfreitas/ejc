import { EquipesCadastroComponent } from './equipes-cadastro/equipes-cadastro.component';
import { EquipesPesquisaComponent } from './equipes-pesquisa/equipes-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EquipesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EQUIPE'] }
  },
  {
    path: 'novo',
    component: EquipesCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EQUIPE'] }
  },
  {
    path: ':codigo',
    component: EquipesCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_EQUIPE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EquipesRoutingModule { }
