import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public URL:string = "http://localhost:8082/api/categorias"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getallCategorias():Observable<any>{
    return this.httpClient.get(`${this.URL}/listarcategorias`)
    //return this.http.get<Proyect[]>(`${this.URL}/ListProyecto`);
  }
}
