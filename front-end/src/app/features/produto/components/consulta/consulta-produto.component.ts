import { Component } from '@angular/core';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css'],
})
export class ConsultaProdutoComponent {
  public produtos: Produto[] = [];

  produto: Produto = {
    id: 0,
    descricao: '',
    custo: 0
  };

  constructor(private _produtoService: ProdutoService) {}

  ngOnInit(): void {
    this._produtoService.getProdutos().subscribe((retorno) => {
      this.produtos = retorno
      console.log(this.produtos)
    });
  }


}
