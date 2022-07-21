import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from './../shared/shared.module';
import { EjcsRoutingModule } from './ejcs-routing.module';

import { EjcsPesquisaComponent } from './ejcs-pesquisa/ejcs-pesquisa.component';
import { EjcsCadastroComponent } from './ejcs-cadastro/ejcs-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    ProgressSpinnerModule,

    SharedModule,
    EjcsRoutingModule
  ],
  declarations: [EjcsPesquisaComponent, EjcsCadastroComponent]
})
export class EjcsModule { }
