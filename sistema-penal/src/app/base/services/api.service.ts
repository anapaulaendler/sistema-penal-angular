import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiService<TObject> {
    private readonly API_URL = 'http://localhost:5034/';
    
    constructor(
        private http: HttpClient
    ) {}

    public getById<TObject>(params: IApiParams) {
        return this.http.get<TObject>(`${this.API_URL}/${params.controller}/${params.id}`, this.getParams(params)) as unknown as Observable<TObject>
    }

    public getList(params: IApiParams) {
        return this.http.get<TObject[]>(`${this.API_URL}/${params.controller}`, this.getParams(params)) as unknown as Observable<TObject[]>
    }

    public post<TObject>(params: IApiParams) {
        return this.http.post(`${this.API_URL}/${params.controller}/${params.id}`, params.object, this.getParams(params))
    }

    public put<TObject>(params: IApiParams) {
        return this.http.put(`${this.API_URL}/${params.controller}/${params.id}`, params.object, this.getParams(params))
    }

    public delete(params: IApiParams) {
        return this.http.delete(`${this.API_URL}/${params.id}`)
    }

    public getParams(apiParams: IApiParams): any {
        return {...apiParams }
    }
}