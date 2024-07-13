import { Component } from '@angular/core';
import { Produto } from '../../model/produto.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css']
})
export class ConsultaProdutoComponent {

  public produtos: Produto[] = [];

  produto: Produto = {
    id: 0,
    descricao: '',
    custo: 0
  }

}
