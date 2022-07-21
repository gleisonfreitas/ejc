import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EdgPesquisaComponent } from './edg-pesquisa/edg-pesquisa.component';

import { SharedModule } from './../shared/shared.module';
import { EdgRoutingModule } from './edg-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    DialogModule,
    TooltipModule,

    SharedModule,
    EdgRoutingModule
  ],
  declarations: [EdgPesquisaComponent]
})
export class EdgModule { }
