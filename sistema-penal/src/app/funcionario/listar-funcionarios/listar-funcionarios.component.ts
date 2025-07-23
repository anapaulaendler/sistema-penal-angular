import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuncionarioService } from '../funcionario.service';

type Cargo = 'general' | 'admin';

interface Funcionario {
  nome: string;
  dataNascimento: Date;
  cpf: string;
  id?: string;
  email: string;
  papel: Cargo;
  senha: string;
}

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent {
  form: FormGroup;
  funcionarios: Funcionario[] = [];
  erro: string = '';

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService
  ) { 
    this.form = this.fb.group({
      /* ???? */
    });
  }

  async buscarFuncionarios() {
    try {
      const funcionarios = await this.funcionarioService.listarFuncionarios();
      this.funcionarios = funcionarios;
      this.erro = '';
    } catch (err) {
      console.error('Erro ao buscar funcionarios:', err);
      this.funcionarios = [];
      this.erro = 'Erro ao encontrar funcionarios.';
    }
  }
}
