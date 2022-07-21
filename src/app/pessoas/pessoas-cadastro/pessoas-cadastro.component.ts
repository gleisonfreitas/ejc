import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Historico, Filiacao, Padrinho } from './../../core/model';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any;
  cidades: any;
  estadoSelecionado: any;
  encontrista = true;
  edg = false;
  coordenador = false;
  dirigente = false;

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    const codigo = this.route.snapshot.params['codigo'];

    this.listarEstados();

    if (codigo) {
      this.buscarPorCodigo(codigo);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  configurarEncontreiro() {
   this.encontrista = false;
   this.pessoa.encontrista = false;
   this.pessoa.encontreiro = true;
   if (this.pessoa.filiacao) {
     this.pessoa.filiacao.pai = null;
     this.pessoa.filiacao.telefonePai = null;
     this.pessoa.filiacao.mae = null;
     this.pessoa.filiacao.telefoneMae = null;
   }

   if (!this.pessoa.codigo) {
     this.pessoa.historicos = new Array<Historico>();
   }
   this.pessoa.filiacao = null;
   this.pessoa.padrinho = null;
  }

  configurarEncontrista() {
    this.encontrista = true;
    this.pessoa.encontrista = true;
    this.pessoa.encontreiro = false;
    if (!this.pessoa.codigo) {
      this.pessoa.filiacao = new Filiacao();
      this.pessoa.padrinho = new Padrinho();
    }
    this.pessoa.historicos = null;
  }


  salvar(form: FormControl) {
    if (this.coordenador) {
      this.pessoa.coordenador = 'S';
    } else {
      this.pessoa.coordenador = 'N';
    }
    if (this.edg) {
      this.pessoa.edg = 'S';
    } else {
      this.pessoa.edg = 'N';
    }
    if (this.dirigente) {
      this.pessoa.dirigenteCirculo = 'S';
    } else {
      this.pessoa.dirigenteCirculo = 'N';
    }
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {

    this.pessoaService.adicionar(this.pessoa)
      .then( () => {

        this.toastyService.success('Pessoa cadastrada com sucesso!');

        form.reset();
        this.pessoa = new Pessoa();
        if (this.encontrista) {
          this.configurarEncontrista();
        } else {
          this.configurarEncontreiro();
        }

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarPessoa(form: FormControl) {

    this.pessoaService.atualizar(this.pessoa)
      .then( () => {

        this.toastyService.success('Pessoa atualizada com sucesso!');

      }).catch( erro => this.errorHandlerService.handler(erro));
  }

  buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then( response => {
        this.pessoa = response;
        this.atualizarTituloEdicao();

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.pesquisarCidade();
        }

        if (this.pessoa.encontreiro) {
          this.configurarEncontreiro();
        } else {
          this.configurarEncontrista();
        }

        if (this.pessoa.coordenador === 'S') {
          this.coordenador = true;
        }
        if (this.pessoa.edg === 'S') {
          this.edg = true;
        }
        if (this.pessoa.dirigenteCirculo === 'S') {
          this.dirigente = true;
        }

      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  listarEstados() {
    this.pessoaService.listarEstado()
      .then( response => {
        this.estados = response.map( e => ({ label: e.nome, value: e.codigo}));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }

  selecionarEstado() {
    this.pessoa.endereco.cidade.codigo = null;
    this.pesquisarCidade();
  }

  pesquisarCidade() {
    this.pessoaService.pesquisarCidade(this.estadoSelecionado)
      .then( response => {
        this.cidades = response.map( c => ({ label: c.nome, value: c.codigo}));
      })
      .catch( erro => this.errorHandlerService.handler(erro));
  }
}
