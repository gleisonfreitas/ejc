import { DadosComplementares } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-dados-complementares',
  templateUrl: './pessoas-dados-complementares.component.html',
  styleUrls: ['./pessoas-dados-complementares.component.css']
})
export class PessoasDadosComplementaresComponent implements OnInit {

  @Input()
  dadosComplementares = new DadosComplementares();

  constructor() { }

  ngOnInit() {
  }

}
