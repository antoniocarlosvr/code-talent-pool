import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url = 'http://localhost:3000/produto';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  getProdutoById(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  getProdutoByDescricao(descricaoBusca: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, produto);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${id}`, produto);
  }

  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
