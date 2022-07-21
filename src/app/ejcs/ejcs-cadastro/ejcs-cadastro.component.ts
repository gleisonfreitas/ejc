import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';
import {Message} from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EjcService } from './../ejc.service';
import { IgrejaService } from './../../igrejas/igreja.service';

import { Ejc } from './../../core/model';


@Component({
  selector: 'app-ejcs-cadastro',
  templateUrl: './ejcs-cadastro.component.html',
  styleUrls: ['./ejcs-cadastro.component.css']
})
export class EjcsCadastroComponent implements OnInit {

  ejc = new Ejc();
  igrejas = [];

  urlUpload: string;

  msgs: Message[];

  uploadedFiles: any[] = [];

  uploadEmAndamento: boolean;

  constructor(
    private igrejaService: IgrejaService,
    private ejcService: EjcService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo EJC');
    const codigo = this.route.snapshot.params['codigo'];

    this.listarIgrejas();

    if (codigo) {
      this.buscarPorCodigo(codigo);
      this.urlUpload = `${environment.apiUrl}/ejcs/upload/${codigo}`;
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
    this.uploadEmAndamento = false;
  }

  listarIgrejas() {
    this.igrejaService.listarTodas()
      .then( response => {
        this.igrejas = response.igrejas.map( i => ({ label: i.nome, value: i.codigo}));
      })
      .catch( erro => this.errorHandlerService.handler(erro))
  }

  get editando() {
    return Boolean(this.ejc.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEjc(form);
    } else {
      this.adicionarEjc(form);
    }
  }

  adicionarEjc(form: FormControl) {

    this.ejcService.adicionar(this.ejc)
      .then( () => {

        this.toastyService.success('EJC cadastrado com sucesso!');

        form.reset();
        this.ejc = new Ejc();

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarEjc(form: FormControl) {

    this.ejcService.atualizar(this.ejc)
      .then( () => {

        this.toastyService.success('EJC atualizado com sucesso!');

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  buscarPorCodigo(codigo: number) {
    this.ejcService.buscarPorCodigo(codigo)
      .then( response => {
        this.ejc = response;
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do EJC: ${this.ejc.igreja.nome}`);
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function(){
      this.ejc = new Ejc();
    }.bind(this), 1);

    this.router.navigate(['/ejcs/novo']);
  }

}
