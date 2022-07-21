import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CirculosRoutingModule } from './circulos-routing.module';
import { SharedModule } from './../shared/shared.module';

import { CirculosCadastroComponent } from './circulos-cadastro/circulos-cadastro.component';
import { CirculosPesquisaComponent } from './circulos-pesquisa/circulos-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    PickListModule,
    PanelModule,
    TooltipModule,

    SharedModule,
    CirculosRoutingModule
  ],
  declarations: [CirculosCadastroComponent, CirculosPesquisaComponent]
})
export class CirculosModule { }
