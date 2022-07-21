import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { Title } from '@angular/platform-browser';


import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PermissaoService } from './../usuarios/permissao.service';
import { UsuarioService } from './../usuarios/usuario.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PatrimonioService } from './../patrimonios/patrimonio.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { EjcService } from './../ejcs/ejc.service';
import { CompraService } from './../compras/compra.service';
import { IgrejaService } from './../igrejas/igreja.service';
import { EdgService } from './../edg/edg.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { CirculoService } from './../circulos/circulo.service';
import { EquipeService } from './../equipes/equipe.service';
import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,

    Ng4LoadingSpinnerModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    Ng4LoadingSpinnerModule,
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService,
    ErrorHandlerService,

    PessoaService,
    EquipeService,
    CirculoService,
    EdgService,
    IgrejaService,
    EjcService,
    DashboardService,
    CompraService,
    PatrimonioService,
    LancamentoService,
    UsuarioService,
    PermissaoService,

    AuthService,
    JwtHelper,
    Title,
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class CoreModule { }
