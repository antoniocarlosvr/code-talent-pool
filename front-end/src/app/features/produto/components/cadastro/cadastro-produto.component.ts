import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../model/produto.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
})
export class CadastroProdutoComponent {
  produto: Produto = new Produto(0, '', 0, new Uint8Array());

  constructor(private produtoService: ProdutoService) {}

  cadastrarProduto(): void {
    this.produtoService.createProduto(this.produto).subscribe((response) => {
      console.log('Produto cadastrado:', response);
    });
  }

  handleFileInput(files: FileList): void {
    const file = files.item(0);
    if (file) { // Verifica se o arquivo não é null
      const reader = new FileReader();
      reader.onload = () => {
        this.produto.imagem = new Uint8Array(reader.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("Nenhum arquivo selecionado.");
    }
  }
}
