import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListarFuncionariosComponent } from './funcionario/listar-funcionarios/listar-funcionarios.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'listar/funcionario', component: ListarFuncionariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
