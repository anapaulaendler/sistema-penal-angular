import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from '../atividade.service';

@Component({
  selector: 'app-add-atividade',
  templateUrl: './add-atividade.component.html',
  styleUrls: ['./add-atividade.component.css']
})
export class AddAtividadeComponent {
  form: FormGroup;
  resposta: string = '';
  respostaClasse: string = '';

  constructor(
    private fb: FormBuilder,
    private atividadeService: AtividadeService
  ) {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      tipoAtividade: ['', Validators.required],
      prisioneiroId: [''],
      descricao: [''],
      isbn: [''],
      materia: ['']
    });
  }

  async buscarCpf() {
    const cpf = this.form.value.cpf;
    if (!this.form.controls['cpf'].valid) {
      this.resposta = 'Por favor, insira um CPF com 11 dígitos (use apenas números).';
      this.respostaClasse = 'resposta-erro';
      return;
    }
    
    try {
      const prisioneiro = await this.atividadeService.buscarPorCpf(cpf);
      if (!prisioneiro?.id) {
        this.resposta = 'Prisioneiro não encontrado.';
        this.respostaClasse = 'resposta-erro';
        return;
      }
  
      this.form.patchValue({ prisioneiroId: prisioneiro.id });
      this.resposta = 'Prisioneiro encontrado.';
      this.respostaClasse = 'resposta-sucesso';
    } catch (err) {
      this.resposta = 'Erro ao conectar com o servidor.';
      this.respostaClasse = 'resposta-erro';
    }
  }

  async onSubmit() {
    const { tipoAtividade, prisioneiroId, descricao, isbn, materia } = this.form.value;

    let payload: any = { prisioneiroId };

    if (tipoAtividade === 'dias-de-trabalho') {
      payload.descricao = descricao;
    } else if (tipoAtividade === 'estudos') {
      payload.materia = materia;
    } else if (tipoAtividade === 'livros') {
      payload.isbn = isbn;
    }

    try {
      await this.atividadeService.adicionarAtividade(tipoAtividade, payload);
      alert('Atividade adicionada com sucesso!');
    } catch (err) {
      alert('Erro ao adicionar atividade.');
    }
  }
}
