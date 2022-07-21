import { ErrorHandlerService } from './../../core/error-handler.service';
import { EquipeService } from './../../equipes/equipe.service';
import { FormControl } from '@angular/forms';
import { Historico } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-cadastro-historico',
  templateUrl: './pessoas-cadastro-historico.component.html',
  styleUrls: ['./pessoas-cadastro-historico.component.css']
})
export class PessoasCadastroHistoricoComponent implements OnInit {

  @Input() historicos = new Array<Historico>();
  exibindoDialogHistorico = false;
  historico: Historico;
  historicoIndex: number;
  equipeEnum: any;
  equipes = [];

  constructor(
    private equipeService: EquipeService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.listarNomesEquipes();
  }

  listarNomesEquipes() {
    this.equipeService.listarNomesEquipes()
      .then( response => {
        this.equipes = response.map( e => ({ label: e.descricao, value: e }));
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  prepararNovoHistorico() {
    this.exibindoDialogHistorico = true;
    this.historico = new Historico();
    this.historicoIndex = this.historicos.length;
  }

  prepararEdicaoHistorico(historico: Historico, index: number) {
    this.historico = this.clonarHistorico(historico);
    this.exibindoDialogHistorico = true;
    this.historicoIndex = index;
  }

  removerHistorico(index: number) {
    this.historicos.splice(index, 1);
  }

  confirmarHistorico(frm: FormControl) {
    this.historico.equipe = this.equipeEnum.nome;
    this.historico.nomeEquipe = this.equipeEnum.descricao;
    this.historicos[this.historicoIndex] = this.clonarHistorico(this.historico);

    this.exibindoDialogHistorico = false;

    frm.reset();
  }
  private clonarHistorico(historico: Historico): Historico {
    return new Historico(historico.quantidade, historico.coordenador,
      historico.equipe, historico.nomeEquipe);
  }

  get editando() {
    return this.historico && this.historico.codigo;
  }

}
