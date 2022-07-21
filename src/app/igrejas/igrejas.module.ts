import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { IgrejasRoutingModule } from './igrejas-routing.module';
import { SharedModule } from './../shared/shared.module';
import { IgrejasCadastroComponent } from './igrejas-cadastro/igrejas-cadastro.component';
import { IgrejasPesquisaComponent } from './igrejas-pesquisa/igrejas-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FileUploadModule,

    SharedModule,
    IgrejasRoutingModule
  ],
  declarations: [IgrejasCadastroComponent, IgrejasPesquisaComponent]
})
export class IgrejasModule { }
