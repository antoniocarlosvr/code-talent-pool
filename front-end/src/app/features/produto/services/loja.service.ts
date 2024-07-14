import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loja } from '../model/loja.model';

@Injectable({
  providedIn: 'root',
})
export class LojaService {
  private url = 'http://localhost:3000/loja';

  constructor(private http: HttpClient) {}

  createLoja(loja: Loja): Observable<Loja> {
    return this.http.post<Loja>(this.url, loja);
  }

  getLojas(): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.url);
  }

  getLojaById(id: string): Observable<Loja> {
    return this.http.get<Loja>(`${this.url}/search/id?id=${id}`);
  }

  getLojaByDescricao(descricao: string): Observable<Loja[]> {
    return this.http.get<Loja[]>(`${this.url}/search/descricao?descricao=${descricao}`);
  }

  updateLoja(id: number, loja: Loja): Observable<Loja> {
    return this.http.put<Loja>(`${this.url}/${id}`, loja);
  }

  deleteLoja(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
