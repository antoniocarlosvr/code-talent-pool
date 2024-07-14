import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoLoja } from '../model/produtoloja.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoLojaService {
  private url = 'http://localhost:3000/produtoloja';

  constructor(private http: HttpClient) {}

  createProdutoLoja(produtoLoja: ProdutoLoja): Observable<ProdutoLoja> {
    return this.http.post<ProdutoLoja>(this.url, produtoLoja);
  }

  getProdutoLojas(): Observable<ProdutoLoja[]> {
    return this.http.get<ProdutoLoja[]>(this.url);
  }

  getProdutoLojaById(id: string): Observable<ProdutoLoja> {
    return this.http.get<ProdutoLoja>(`${this.url}/search/id?id=${id}`);
  }

  getProdutoLojaByPrecoVenda(precoVenda: string): Observable<ProdutoLoja[]> {
    return this.http.get<ProdutoLoja[]>(`${this.url}/search/precoVenda?precoVenda=${precoVenda}`);
  }

  updateProdutoLoja(id: number, produtoLoja: ProdutoLoja): Observable<ProdutoLoja> {
    return this.http.put<ProdutoLoja>(`${this.url}/${id}`, produtoLoja);
  }

  deleteProdutoLoja(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
