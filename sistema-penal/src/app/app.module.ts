import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAtividadeComponent } from './atividades/add-atividade/add-atividade.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarAtividadesComponent } from './atividades/listar-atividades/listar-atividades.component';
import { ListarAtividadesPrisioneiroComponent } from './atividades/listar-atividades-prisioneiro/listar-atividades-prisioneiro.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAtividadeComponent,
    ListarAtividadesComponent,
    ListarAtividadesPrisioneiroComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      // Implemente aqui a lógica para obter o token do usuário autenticado
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ['api.example.com'],
    blacklistedRoutes: ['api.example.com/login']
  }
}