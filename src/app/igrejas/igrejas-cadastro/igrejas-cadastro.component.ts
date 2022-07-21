import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { environment } from './../../../environments/environment';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { IgrejaService } from './../igreja.service';

import { Igreja } from './../../core/model';

@Component({
  selector: 'app-igrejas-cadastro',
  templateUrl: './igrejas-cadastro.component.html',
  styleUrls: ['./igrejas-cadastro.component.css']
})
export class IgrejasCadastroComponent implements OnInit {

  igreja = new Igreja();
  urlUpload: string;

  constructor(
    private igrejaService: IgrejaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Igreja');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
      this.urlUpload = `${environment.apiUrl}/igrejas/upload/${codigo}`;
    }
  }

  antesUpload(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer' + localStorage.getItem('token'));
  }

  onUpload(event) {
    this.toastyService.success('Apload realizado com sucesso!');
  }

  erroUpload(event) {
    this.toastyService.error('Erro ao tentar enviar logo!');
  }

  get editando() {
    return Boolean(this.igreja.codigo);
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function(){
      this.igreja = new Igreja();
    }.bind(this), 1);

    this.router.navigate(['/igrejas/novo']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarIgreja(form);
    } else {
      this.adicionarIgreja(form);
    }
  }

  adicionarIgreja(form: FormControl) {

    this.igrejaService.adicionar(this.igreja)
      .then( () => {

        this.toastyService.success('Igreja cadastrada com sucesso!');

        form.reset();
        this.igreja = new Igreja();

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarIgreja(form: FormControl) {

    this.igrejaService.atualizar(this.igreja)
      .then( () => {

        this.toastyService.success('Igreja atualizada com sucesso!');

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  buscarPorCodigo(codigo: number) {
    this.igrejaService.buscarPorCodigo(codigo)
      .then( response => {
        this.igreja = response;
        this.atualizarTituloEdicao();
    })
    .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de igreja: ${this.igreja.nome}`);
  }

}
