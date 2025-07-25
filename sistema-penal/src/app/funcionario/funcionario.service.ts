import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
    constructor(private http: HttpClient) {}
    
    private apiUrl = 'http://localhost:5034/funcionarios';

    buscarPorCpf(cpf: string) {
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/cpf/${cpf}`)); // toPromise() is being deprecated in RxJS 7 and will be removed in RxJS 8
    } 

    adicionarFuncionario(payload: any) {
        return lastValueFrom(this.http.post(`${this.apiUrl}`, payload));
    }

    listarFuncionarios() {
        return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}`));
    }
}