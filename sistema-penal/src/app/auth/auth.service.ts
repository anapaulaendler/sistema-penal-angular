import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class AuthService {
    
    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post<User>('/api/login', { email, password })
        .shareReplay(); 
        /* We are calling shareReplay to prevent the receiver of this Observable from accidentally 
        triggering multiple POST requests due to multiple subscriptions. */
    }
}