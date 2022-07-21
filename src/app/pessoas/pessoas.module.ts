import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasDadosComplementaresComponent } from './pessoas-dados-complementares/pessoas-dados-complementares.component';
import { PessoasCadastroHistoricoComponent } from './pessoas-cadastro-historico/pessoas-cadastro-historico.component';
import { PessoasPesquisaPreCadastroComponent } from './pessoas-pesquisa-pre-cadastro/pessoas-pesquisa-pre-cadastro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CurrencyMaskModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    RadioButtonModule,
    InputMaskModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    CheckboxModule,

    SharedModule,
    PessoasRoutingModule
  ],
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasDadosComplementaresComponent,
    PessoasCadastroHistoricoComponent,
    PessoasPesquisaPreCadastroComponent]
})
export class PessoasModule { }
