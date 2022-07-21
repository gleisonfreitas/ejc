import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,

    CoreModule,
    SegurancaModule,
    AppRoutingModule

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
