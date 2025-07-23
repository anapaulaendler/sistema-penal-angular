import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.css'],
})
export class AddFuncionarioComponent {
  form: FormGroup;
  resposta: string = '';
  respostaClasse: string = '';

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      papel: ['', Validators.required]
    })
   }

  async onSubmit() {
    const { nome, dataNascimento, cpf, email, senha, papel } = this.form.value;

    let payload: any;

    try {
      await this.funcionarioService.adicionarFuncionario(payload);
      alert('Funcionario adicionado com sucesso!');
    } catch (err) {
      alert('Erro ao adicionar funcionario.');
    }
  }
}
