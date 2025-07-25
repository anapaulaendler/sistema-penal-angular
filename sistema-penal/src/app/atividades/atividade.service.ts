import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAtividade } from './listar-atividades/listar-atividades.component';
import { ApiService } from '../base/services/api.service';

@Injectable({ providedIn: 'root' })
export class AtividadeService extends ApiService<IAtividade> {
    constructor(
        private _httpClient: HttpClient,
        private _apiService: ApiService<IAtividade>
    ) {
        super(_httpClient)
    }

    buscarPorCpf(cpf: string) {
        return lastValueFrom(this._apiService.getById<{id: string}>({
            controller: 'prisioneiros/cpf',
            id: cpf
        })); // toPromise() is being deprecated in RxJS 7 and will be removed in RxJS 8
    } // TODO: mover para prisioneiro service
    // Não usar (lastValueFrom), mais performático extrair a variável no próprio HTML

    adicionarAtividade(tipoAtividade: string, payload: any) {
        return lastValueFrom(this._apiService.post({controller: tipoAtividade, object: payload}));
    }

    listarAtividades(tipoAtividade: string) {
        return lastValueFrom(this._apiService.getById<IAtividade[]>({controller: tipoAtividade}));
    }

    listarAtividadesPorPrisioneiro(tipoAtividade: string, prisioneiroId: string) {
        return lastValueFrom(this._apiService.getById<IAtividade[]>({controller: `/${tipoAtividade}/${prisioneiroId}`}));
    }
}