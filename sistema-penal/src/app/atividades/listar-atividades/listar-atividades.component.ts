import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AtividadeService } from '../atividade.service';

export type TipoAtividade = 'dias-de-trabalho' | 'estudos' | 'livros';

export interface IAtividade {
  id: number;
  prisioneiroId: string;
  data: string;
  descricao?: string;
  isbn?: string;
  materia?: string;
}

@Component({
  selector: 'app-listar-atividades',
  templateUrl: './listar-atividades.component.html',
  styleUrls: ['./listar-atividades.component.css']
})
export class ListarAtividadesComponent {
  form: FormGroup;
  atividades: IAtividade[] = [];
  erro: string = '';

  constructor(
    private fb: FormBuilder,
    private atividadeService: AtividadeService
  ) {
    this.form = this.fb.group({
      tipoAtividade: ['dias-de-trabalho']
    });
  }

  async buscarAtividades() {
    const tipo: TipoAtividade = this.form.value.tipoAtividade;

    try {
      const atividades = await this.atividadeService.listarAtividades(tipo);
      this.atividades = atividades;
      this.erro = '';
    } catch (err) {
      console.error('Erro ao buscar atividades:', err);
      this.atividades = [];
      this.erro = 'Erro ao encontrar atividades.';
    }
  }

  detalhesAtividade(atividade: IAtividade): string {
    if (atividade.descricao) return atividade.descricao;
    if (atividade.isbn) return atividade.isbn;
    if (atividade.materia) return atividade.materia;
    return 'Sem detalhes disponíveis.';
  }
}