import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { UsuarioFiltro, UsuarioService } from './../usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  usuarios = [];
  @ViewChild('tabela') grid;

  constructor(
    private usuarioService: UsuarioService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Usuarios');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.usuarioService.pesquisar(this.filtro)
      .then( resultado => {
        this.usuarios = resultado.usuarios;
        this.totalRegistros = resultado.total;
      })
      .catch( error => this.errorHandlerService.handler(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {

    this.usuarioService.excluir(usuario.codigo)
      .then( () => {

        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toastyService.success('Usuario excluído com sucesso!');
      })
      .catch( error => this.errorHandlerService.handler(error));
  }

}
