import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';

import { UsuariosAlteraSenhaComponent } from './usuarios-altera-senha/usuarios-altera-senha.component';
import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_USUARIO'] }
  },
  {
    path: 'novo',
    component: UsuariosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_USUARIO'] }
  },
  {
    path: 'alterarsenha',
    component: UsuariosAlteraSenhaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ALTERAR_SENHA'] }
  },
  {
    path: ':codigo',
    component: UsuariosCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_USUARIO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
