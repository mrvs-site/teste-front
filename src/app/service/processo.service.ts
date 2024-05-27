import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../model/processo'; 
import { Observable } from 'rxjs';
import { PaginaProcesso } from '../model/pagina.processo';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {


    url: string = "http://localhost:8080/api/processos";
   

    constructor(private http: HttpClient) { }
       


    listar(page, size, campo, direcao) :Observable<PaginaProcesso>{
        const params = new HttpParams()
        .set('page',page)
        .set('size',size)
        .set('campo',campo)
        .set("direcao",direcao)
    
        return this.http.get<any>(`${this.url}?${params.toString()}`);
      }

      salvar(form: FormData):Observable<any>{
        return this.http.post<any>(`${this.url}`,form);
      }



}


