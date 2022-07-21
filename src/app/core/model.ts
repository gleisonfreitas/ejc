export class Igreja {
  codigo: number;
  nome: string;
  pastor: string;
}

export class Edg {
  codigo: number;
  funcao: string;
  pessoa = new Pessoa();
  ejc = new Ejc();
}

export class Ejc {
  codigo: number;
  numero: string;
  tema: string;
  escola: string;
  enderecoEscola: string;
  inicio: Date;
  fim: Date;
  ativo = true;
  logo: any[];
  igreja = new Igreja();
}

export class Equipe {
  codigo: number;
  nome: string;
  coordenadorUm = new Pessoa();
  coordenadorDois = new Pessoa();
  coordenadorTres = new Pessoa();
  ejc = new Ejc();
  encontreiros = new Array<Pessoa>();
}

export class Circulo {
  codigo: number;
  cor: string;
  coordenadorUm = new Pessoa();
  coordenadorDois = new Pessoa();
  coordenadorTres = new Pessoa();
  ejc = new Ejc();
  encontristas = new Array<Pessoa>();
}

export class Pessoa {
  codigo: number;
  nome: string;
  nomeGuerra: string;
  dataNasc: Date;
  sexo: string;
  estadoCivil: string;
  email: string;
  telefone: string;
  trabalhando = false;
  encontrista: boolean;
  encontreiro: boolean;
  edg: string;
  coordenador: string;
  dirigenteCirculo: string;
  endereco = new Endereco();
  dadosComplementares = new DadosComplementares();
  padrinho = new Padrinho();
  filiacao = new Filiacao();
  historicos = new Array<Historico>();
}

export class Filiacao {
  codigo: number;
  pai: string;
  mae: string;
  telefonePai: string;
  telefoneMae: string;
}
export class Padrinho {
  codigo: number;
  nome: string;
  telefone: string;
  trabalhando: boolean;
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class DadosComplementares {
  codigo: number;
  tamanhoBlusa: string;
  profissao: string;
  religiao: string;
  igreja: string;
  restricaoAlimentar: string;
  medicamento: string;
  alergia: string;
  conducao: string;
  instrumento: string;
  codigo_pessoa: number;
}

export class Historico {
  codigo: number;
  quantidade: number;
  coordenador: boolean;
  equipe: string;
  nomeEquipe: string;

  constructor(quantidade?: number, coordenador?: boolean, equipe?: string, nomeEquipe?: string) {
    this.quantidade = quantidade;
    this.coordenador = coordenador;
    this.equipe = equipe;
    this.nomeEquipe = nomeEquipe;
  }
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();

}

export class Estado {
  codigo: number;
  nome: string;
}

export class Compra {
  codigo: number;
  descricao: string;
  unidade: string;
  valor: number;
  quantidade: number;
  ejc = new Ejc();
}

export class Patrimonio {
  codigo: number;
  descricao: string;
  responsavel: string;
  dataCompra: Date;
  valor: number;
  quantidade: number;
  estado: string;
  numeroSerie: string;
  local: string;
  igreja = new Igreja();
}

export class Lancamento {
  codigo: number;
  descricao: string;
  data: Date;
  valor: number;
  tipo: string;
  estado: string;
  observacao: string;
  ejc = new Ejc();
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes: Permissao[] = [];
  ejc = new Ejc();
}

export class Permissao {
  codigo: number;
  descricao: string;
}
