import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa-pre-cadastro',
  templateUrl: './pessoas-pesquisa-pre-cadastro.component.html',
  styleUrls: ['./pessoas-pesquisa-pre-cadastro.component.css']
})
export class PessoasPesquisaPreCadastroComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private confirmacaoService: ConfirmationService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then( resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      }).catch(
        error => this.errorHandlerService.handler(error)
      );
  }

}
