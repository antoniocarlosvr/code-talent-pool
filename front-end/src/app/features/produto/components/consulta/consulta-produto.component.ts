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
  public id: number = 0;
  public descricao: string = '';
  public custo: number = 0;

  constructor(private _produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this._produtoService.getProdutos().subscribe((retorno: Produto[]) => {
      this.produtos = retorno; // Aqui, retorno deve ser um array de Produto
      console.log(this.produtos);
    });
  }

  findCodigo(): void {
    if (this.id !== null) {
      this._produtoService.getProdutoById(this.id).subscribe((retorno) => {
        this.produtos = retorno ? [retorno] : []; // Aqui também, retorno deve ser um array de Produto
        console.log(this.produtos);
      });
    } else if(this.id == null) {
      this.loadProdutos(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
    } else {
      this.loadProdutos(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
    }
  }

  findDescricao(): void {
    if (this.descricao.trim() !== '') {
      this._produtoService.getProdutoByDescricao(this.descricao).subscribe((retorno: Produto[]) => {
        this.produtos = retorno; // Aqui também, retorno deve ser um array de Produto
        console.log(this.produtos);
      });
    } else {
      this.loadProdutos(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
    }
  }

  findCusto(): void {
    if (this.custo !== 0) {
      this._produtoService.getProdutoByCusto(this.custo).subscribe((retorno) => {
        this.produtos = retorno; // Aqui também, retorno deve ser um array de Produto
        console.log(this.produtos);
      });
    } else {
      this.loadProdutos(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
    }
  }
}
