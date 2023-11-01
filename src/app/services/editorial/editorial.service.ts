import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  public URL:string = "http://localhost:8082/api/editoriales"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getallEditoriales():Observable<any>{
    return this.httpClient.get(`${this.URL}/listareditoriales`)
    //return this.http.get<Proyect[]>(`${this.URL}/ListProyecto`);
  }
}
