import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../model/produto.model';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, switchMap } from 'rxjs';
import { Loja } from '../../model/loja.model';
import { LojaService } from '../../services/loja.service';
import { ProdutoLoja } from '../../model/produtoloja.model';
import { ProdutoLojaService } from '../../services/produtoloja.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
})
export class CadastroProdutoComponent {
  // produto: Produto = new Produto(0, '', 0, new Uint8Array());

  constructor(private produtoService: ProdutoService, private service: ProdutoLojaService) {}

  // cadastrarProduto(): void {
  //   this.produtoService.createProduto(this.produto).subscribe((response) => {
  //     console.log('Produto cadastrado:', response);
  //   });
  // }

  // handleFileInput(files: FileList): void {
  //   const file = files.item(0);
  //   if (file) { // Verifica se o arquivo não é null
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.produto.imagem = new Uint8Array(reader.result as ArrayBuffer);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   } else {
  //     console.error("Nenhum arquivo selecionado.");
  //   }
  // }

  fromControl: FormControl = new FormControl('');
  public lojas: Loja[] = []; // Inicializa como um array vazio
  public produtolojas: ProdutoLoja[] = [];
  public id: string = '';
  public descricao: string = '';
  public precoVenda: number = 0;

  public produtos: Produto[] = [];
  produto: Produto = {
    id: 0,
    descricao: "",
    custo: 0,
    imagem: new Uint8Array
  }

  add() {
    console.log(this.produto)
    this.produtoService.createProduto(this.produto).subscribe(
      () => { this.produto = new Produto(0, "", 0, new Uint8Array) },
      () => { console.log("ERRO = Cadastro inválido!") }
    )

    //this.produtoloja.produto = this.produto.id;

    window.location.href = "/produto";
  }

  //constructor(private service: ProdutoLojaService) {}

  ngOnInit(): void {
    // this.fromControl.valueChanges.pipe(
    //   //debounceTime(900),
    //   distinctUntilChanged(),
    //   switchMap(
    //     value => value ? this.service.getLojaByDescricao(value) : this.service.getLojas()

    //   )
    // ).subscribe(result => {
    //   this.lojas = result;
    // });
    this.loadProdutoLojas();
  }

  loadProdutoLojas(): void {
    this.service.getProdutoLojas().subscribe((retorno: ProdutoLoja[]) => {
      this.produtolojas = retorno;
      console.log(this.produtolojas);
    });
  }

  // findCodigo(): void {
  //   if (this.id !== '') {
  //     this.service.getLojaById(this.id).subscribe((retorno) => {
  //       this.lojas = retorno ? [retorno] : []; // Aqui também, retorno deve ser um array de Produto
  //       console.log(this.lojas);
  //     });
  //   } else if(this.id == null) {
  //     this.loadLojas(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
  //   } else {
  //     this.loadLojas(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
  //   }
  // }

  // findDescricao(): void {
  //   if (this.descricao.trim() !== '') {
  //     this.service.getLojaByDescricao(this.descricao).subscribe((retorno: Loja[]) => {
  //       this.lojas = retorno; // Aqui também, retorno deve ser um array de Produto
  //       console.log(this.lojas);
  //     });
  //   } else {
  //     this.loadLojas(); // Se o campo de busca estiver vazio, carrega todos os produtos novamente
  //   }
  // }

}
