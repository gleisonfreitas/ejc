import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ComprasPesquisaComponent } from './compras-pesquisa/compras-pesquisa.component';
import { ComprasCadastroComponent } from './compras-cadastro/compras-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CurrencyMaskModule,
    TooltipModule,

    SharedModule,
    ComprasRoutingModule,
  ],
  declarations: [ComprasPesquisaComponent, ComprasCadastroComponent]
})
export class ComprasModule { }
