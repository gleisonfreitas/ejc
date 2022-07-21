import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PasswordModule, PickListModule } from 'primeng/primeng';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from './../shared/shared.module';

import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuariosAlteraSenhaComponent } from './usuarios-altera-senha/usuarios-altera-senha.component';

@NgModule({
  imports: [
    FormsModule,

    PickListModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,

    SharedModule,
    UsuariosRoutingModule
  ],
  declarations: [UsuariosCadastroComponent, UsuariosPesquisaComponent, UsuariosAlteraSenhaComponent]
})
export class UsuariosModule { }
