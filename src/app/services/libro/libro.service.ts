import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  public URL:string = "http://localhost:8082/api/libros"

  constructor(
    private httpClient:HttpClient) { }

  public getallLibros():Observable<any>{
    //return this.httpClient.get(`${this.URL}/listarlibros`)
    return this.httpClient.get(this.URL+"/listarlibros")
  }
  public saveLibro(libro:any):Observable<any>{
    return this.httpClient.post(`${this.URL}/insertarlibros`,libro)
  }
  public deleteLibro(id:number):Observable<any>{
    return this.httpClient.delete(`${this.URL}/eliminarlibros/${id}`)
  }
}
