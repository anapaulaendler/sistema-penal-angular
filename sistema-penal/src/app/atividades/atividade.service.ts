import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtividadeService {
    constructor(private http: HttpClient) {}

    buscarPorCpf(cpf: string) {
        return lastValueFrom(this.http.get<any>(`/prisioneiros/cpf/${cpf}`)); // toPromise() is being deprecated in RxJS 7 and will be removed in RxJS 8
    } // TODO: mover para prisioneiro service
    // Não usar (lastValueFrom), mais performático extrair a variável no próprio HTML

    adicionarAtividade(tipoAtividade: string, payload: any) {
        return lastValueFrom(this.http.post(`/${tipoAtividade}`, payload));
    }

    listarAtividades(tipoAtividade: string) {
        return lastValueFrom(this.http.get<any[]>(`/${tipoAtividade}`));
    }

    listarAtividadesPorPrisioneiro(tipoAtividade: string, prisioneiroId: string) {
        return lastValueFrom(this.http.get<any[]>(`/${tipoAtividade}/${prisioneiroId}`));
    }
}