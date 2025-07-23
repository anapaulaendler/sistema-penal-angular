import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5034/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { Email: email, Senha: senha }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}