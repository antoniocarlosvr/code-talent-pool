import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css'],
})
export class ConsultaProdutoComponent implements OnInit {
  public produtos: Produto[] = []; // Inicializa como um array vazio

  produto: Produto = {
    id: 0,
    descricao: '',
    custo: 0,
    imagem: new Uint8Array()
  }

  public descricaoBusca: string = '';
  public id: number = 0;

  constructor(private _produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this._produtoService.getProdutos().subscribe((retorno) => {
      this.produtos = retorno; // Aqui, retorno deve ser um array de Produto
      console.log(this.produtos);
    });
  }

  performSearch(id: number): void {
    if (this.descricaoBusca.trim() !== '') {
      this._produtoService.getProdutoById().subscribe((retorno) => {
        this.produtos = retorno; // Aqui também, retorno deve ser um array de Produto
        console.log(this.produtos.toString + "NOME ID AQUI");
      });
    } else {
      this.loadProdutos();
    }
  }
}
