import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProdutoComponent } from './cadastro/cadastro-produto.component';
import { ConsultaProdutoComponent } from './consulta/consulta-produto.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    CadastroProdutoComponent,
    ConsultaProdutoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class ProdutoModule { }
