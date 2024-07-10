export class CreateProdutoDto {
  readonly id: number;
  readonly descricao: string;
  readonly custo: number;
  readonly imagem: Buffer;
}
