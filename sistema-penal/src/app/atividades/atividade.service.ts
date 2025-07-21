import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtividadeService {
    constructor(private http: HttpClient) {}

    buscarPorCpf(cpf: string) {
        return lastValueFrom(this.http.get<any>(`/prisioneiros/cpf/${cpf}`)); // toPromise() is being deprecated in RxJS 7 and will be removed in RxJS 8
    }

    adicionarAtividade(tipoAtividade: string, payload: any) {
        return lastValueFrom(this.http.post(`/${tipoAtividade}`, payload));
    }
}