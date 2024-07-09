import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ProdutoComponent } from './produto/produto.component';
import { CadastroProdutoComponent } from './produto/cadastro/cadastro-produto.component';
import { ConsultaProdutoComponent } from './produto/consulta/consulta-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutoComponent,
    ConsultaProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
