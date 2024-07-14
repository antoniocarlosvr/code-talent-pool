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

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/search/id?id=${id}`);
  }

  getProdutoByDescricao(descricao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/search/descricao?descricao=${descricao}`);
  }

  getProdutoByCusto(custo: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/search/custo?custo=${custo}`);
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
