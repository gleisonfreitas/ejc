import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PatrimonioService } from './../patrimonio.service';
import { Patrimonio } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patrimonios-cadastro',
  templateUrl: './patrimonios-cadastro.component.html',
  styleUrls: ['./patrimonios-cadastro.component.css']
})
export class PatrimoniosCadastroComponent implements OnInit {

  patrimonio = new Patrimonio();
  estadosConservacao = [];

  constructor(
    private patrimonioService: PatrimonioService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listarEstadoConservacao();

    this.title.setTitle('Novo Patrimônio');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
  }

  listarEstadoConservacao() {
    this.patrimonioService.listarEstadosConservacao()
      .then( response => {
        this.estadosConservacao = response.map( e => ({ label: e.descricao, value: e.nome}));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPatrimonio(form);
    } else {
      this.adicionarPatrimonio(form);
    }
  }
  get editando() {
    return Boolean(this.patrimonio.codigo);
  }

  adicionarPatrimonio(form: FormControl) {

    this.patrimonioService.adicionar(this.patrimonio)
      .then( () => {

        this.toastyService.success('Patrimônio cadastrado com sucesso!');

        form.reset();
        this.patrimonio = new Patrimonio();

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarPatrimonio(form: FormControl) {

    this.patrimonioService.atualizar(this.patrimonio)
      .then( () => {

        this.toastyService.success('Patrimônio atualizado com sucesso!');

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function() {
      this.patrimonio = new Patrimonio();
    }.bind(this), 1);

    this.router.navigate(['/patrimonios/novo']);
  }

  buscarPorCodigo(codigo: number) {
    this.patrimonioService.buscarPorCodigo(codigo)
      .then( response => {
        this.patrimonio = response;
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de patrimônio: ${this.patrimonio.descricao}`);
  }

}
