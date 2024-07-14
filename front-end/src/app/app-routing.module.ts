import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaProdutoComponent } from './features/produto/components/consulta/consulta-produto.component';
import { CadastroProdutoComponent } from './features/produto/components/cadastro/cadastro-produto.component';
import { EditarProdutoComponent } from './features/produto/components/edição/edicao-produto.component';

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
      { 
        path: 'editar', 
        component: EditarProdutoComponent 
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
