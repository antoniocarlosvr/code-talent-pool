export class Produto {
    constructor(
      public id: number,
      public descricao: string,
      public custo: number,
      public imagem?: Uint8Array // Variável para armazenar dados binários
    ) {}
  }
  