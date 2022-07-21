import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PatrimoniosRoutingModule } from './patrimonios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PatrimoniosCadastroComponent } from './patrimonios-cadastro/patrimonios-cadastro.component';
import { PatrimoniosPesquisaComponent } from './patrimonios-pesquisa/patrimonios-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    CurrencyMaskModule,
    InputMaskModule,
    TooltipModule,

    SharedModule,
    PatrimoniosRoutingModule
  ],
  declarations: [PatrimoniosCadastroComponent, PatrimoniosPesquisaComponent]
})
export class PatrimoniosModule { }
