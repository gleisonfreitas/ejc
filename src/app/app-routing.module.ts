import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  {path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule'},
  {path: 'equipes', loadChildren: 'app/equipes/equipes.module#EquipesModule'},
  {path: 'circulos', loadChildren: 'app/circulos/circulos.module#CirculosModule'},
  {path: 'igrejas', loadChildren: 'app/igrejas/igrejas.module#IgrejasModule'},
  {path: 'edg', loadChildren: 'app/edg/edg.module#EdgModule'},
  {path: 'ejcs', loadChildren: 'app/ejcs/ejcs.module#EjcsModule'},
  {path: 'compras', loadChildren: 'app/compras/compras.module#ComprasModule'},
  {path: 'patrimonios', loadChildren: 'app/patrimonios/patrimonios.module#PatrimoniosModule'},
  {path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule'},
  {path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
