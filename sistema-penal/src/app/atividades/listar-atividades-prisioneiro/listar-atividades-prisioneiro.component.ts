import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from '../atividade.service';

type TipoAtividade = 'dias-de-trabalho' | 'estudos' | 'livros';

interface Atividade {
  id: number;
  prisioneiroId: string;
  data: string;
  descricao?: string;
  isbn?: string;
  materia?: string;
}

@Component({
  selector: 'app-listar-atividades-prisioneiro',
  templateUrl: './listar-atividades-prisioneiro.component.html',
  styleUrls: ['./listar-atividades-prisioneiro.component.css']
})
export class ListarAtividadesPrisioneiroComponent {
  form: FormGroup;
  atividades: Atividade[] = [];
  mensagem = '';
  mensagemClasse = '';
  prisioneiroId: string = '';

  constructor(
    private fb: FormBuilder,
    private atividadeService: AtividadeService
  ) {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      tipoAtividade: ['', Validators.required]
    });
  }

  mostrarMensagem(msg: string, tipo: 'sucesso' | 'erro' | 'info') {
    this.mensagem = msg;
    this.mensagemClasse = `resposta-${tipo}`;
  }

  resetMensagem() {
    this.mensagem = '';
    this.mensagemClasse = '';
  }

  async buscarCpf() {
    this.resetMensagem();

    const cpf = this.form.value.cpf;
    if (!this.form.controls['cpf'].valid) {
      return this.mostrarMensagem('Insira um CPF válido com 11 dígitos numéricos.', 'erro');
    }

    try {
      const prisioneiro = await this.atividadeService.buscarPorCpf(cpf);
      if (!prisioneiro?.id) {
        return this.mostrarMensagem('Prisioneiro não encontrado.', 'erro');
      }

      this.prisioneiroId = prisioneiro.id;
      this.mostrarMensagem('Prisioneiro encontrado com sucesso.', 'sucesso');
    } catch {
      this.mostrarMensagem('Erro ao buscar prisioneiro.', 'erro');
    }
  }

  async buscarAtividades() {
    this.resetMensagem();

    const tipo: TipoAtividade = this.form.value.tipoAtividade;
    if (!this.prisioneiroId) return this.mostrarMensagem('Busque um prisioneiro antes.', 'erro');

    try {
      const atividades = await this.atividadeService.listarAtividadesPorPrisioneiro(tipo, this.prisioneiroId);
      this.atividades = atividades;

      if (atividades.length === 0) {
        this.mostrarMensagem('Nenhuma atividade encontrada.', 'info');
      } else {
        this.mostrarMensagem('Atividades carregadas com sucesso.', 'sucesso');
      }
    } catch {
      this.atividades = [];
      this.mostrarMensagem('Erro ao buscar atividades.', 'erro');
    }
  }

  detalhesAtividade(atividade: Atividade): string {
    if (atividade.descricao) return atividade.descricao;
    if (atividade.isbn) return `ISBN: ${atividade.isbn}`;
    if (atividade.materia) return `Matéria: ${atividade.materia}`;
    return 'Sem detalhes';
  }
}
