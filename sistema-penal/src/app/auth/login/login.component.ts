import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    this.error = '';
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/listar/funcionario']),
      error: () => this.error = 'Usuário ou senha inválidos.',
    });
  }
}
