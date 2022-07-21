import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import {PickListModule} from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { EquipesRoutingModule } from './equipes-routing.module';
import { SharedModule } from './../shared/shared.module';
import { EquipesCadastroComponent } from './equipes-cadastro/equipes-cadastro.component';
import { EquipesPesquisaComponent } from './equipes-pesquisa/equipes-pesquisa.component';

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
    EquipesRoutingModule
  ],
  declarations: [EquipesCadastroComponent, EquipesPesquisaComponent]
})
export class EquipesModule { }
