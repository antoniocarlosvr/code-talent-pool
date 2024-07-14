import { Produto } from './produto.model';
import { Loja } from './loja.model';

export class ProdutoLoja {
    id: number;
    idProduto: Produto;
    idLoja: Loja;
    precoVenda: number;

    constructor(id: number, produto: Produto, loja: Loja, precoVenda: number) {
        this.id = id;
        this.idProduto = produto;
        this.idLoja = loja;
        this.precoVenda = precoVenda;
    }
}