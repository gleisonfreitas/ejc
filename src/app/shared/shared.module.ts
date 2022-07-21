import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageValidacaoComponent } from './message-validacao.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageValidacaoComponent
  ],
  exports: [
    MessageValidacaoComponent
  ]

})
export class SharedModule { }
