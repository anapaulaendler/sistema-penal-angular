import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAtividadeComponent } from './atividades/add-atividade/add-atividade.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarAtividadesComponent } from './atividades/listar-atividades/listar-atividades.component';
import { ListarAtividadesPrisioneiroComponent } from './atividades/listar-atividades-prisioneiro/listar-atividades-prisioneiro.component';
import { LoginComponent } from './auth/login/login.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddAtividadeComponent,
    ListarAtividadesComponent,
    ListarAtividadesPrisioneiroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }