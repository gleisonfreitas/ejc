import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CompraService } from './../compra.service';
import { Compra } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras-cadastro',
  templateUrl: './compras-cadastro.component.html',
  styleUrls: ['./compras-cadastro.component.css']
})
export class ComprasCadastroComponent implements OnInit {

  compra = new Compra();
  unidades = [];

  constructor(
    private compraService: CompraService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listarTipoUnidade();

    this.title.setTitle('Nova Compra');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
  }

  listarTipoUnidade() {
    this.compraService.listarUnidades()
      .then( response => {
        this.unidades = response.map( u => ({ label: u.descricao, value: u.nome}));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEquipe(form);
    } else {
      this.adicionarEquipe(form);
    }
  }
  get editando() {
    return Boolean(this.compra.codigo);
  }

  adicionarEquipe(form: FormControl) {

    this.compraService.adicionar(this.compra)
      .then( () => {

        this.toastyService.success('Compra cadastrada com sucesso!');

        form.reset();
        this.compra = new Compra();

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarEquipe(form: FormControl) {

    this.compraService.atualizar(this.compra)
      .then( () => {

        this.toastyService.success('Compra atualizada com sucesso!');

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function(){
      this.compra = new Compra();
    }.bind(this), 1);

    this.router.navigate(['/compras/novo']);
  }

  buscarPorCodigo(codigo: number) {
    this.compraService.buscarPorCodigo(codigo)
      .then( response => {
        this.compra = response;
        this.atualizarTituloEdicao();
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de compra: ${this.compra.descricao}`);
  }

}
