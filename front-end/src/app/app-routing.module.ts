import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaProdutoComponent } from './produto/consulta/consulta-produto.component';
import { CadastroProdutoComponent } from './produto/cadastro/cadastro-produto.component';

const routes: Routes = [
  { 
    path: 'produto', 
    children: [
      {
        path: '',
        component: ConsultaProdutoComponent 
      },
      { 
        path: 'cadastro', 
        component: CadastroProdutoComponent 
      },
    ], 
  },
  { 
  path: '', 
  redirectTo: '/produto', 
  pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
