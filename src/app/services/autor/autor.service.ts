import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutorService {
  public URL:string = "http://localhost:8082/api/autores"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getallAutores():Observable<any>{
    return this.httpClient.get(`${this.URL}/listarautores`);
  }
}
