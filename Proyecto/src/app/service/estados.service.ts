import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  
  url='http://localhost:3002/estado/act'

  constructor(private http:HttpClient) { }

  public getEstados(): Observable <any>{
    return this.http.get<any>(`${this.url}`)
  }
}
