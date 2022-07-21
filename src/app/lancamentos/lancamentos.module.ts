import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { SharedModule } from './../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CurrencyMaskModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    TooltipModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  declarations: [LancamentosPesquisaComponent, LancamentosCadastroComponent]
})
export class LancamentosModule { }
