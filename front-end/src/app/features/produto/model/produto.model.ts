export class Produto {
  id: number;
  descricao: string;
  custo: number;
  imagem: Uint8Array;

  constructor(id: number, descricao: string, custo: number, imagem: Uint8Array) {
    this.id = id;
    this.descricao = descricao;
    this.custo = custo;
    this.imagem = imagem;
  }
}