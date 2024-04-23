import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdUsuarioService {

  constructor(private http: HttpClient) { }

  obtenerIdUsuario() {
    return this.http.get('http://localhost:3001/id');
  }
}