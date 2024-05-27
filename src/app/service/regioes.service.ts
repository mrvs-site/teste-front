import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Uf } from '../model/uf';
import { Municipios } from '../model/municipios';


@Injectable({
  providedIn: 'root'
})
export class RegioesService {


    url: string = "http://localhost:8080/api/regioes";
   

    constructor(private http: HttpClient) { }
       

  listarUfs() :Observable<Uf[]>{
      return this.http.get<any>(`${this.url}`);
  }

    
  listarMunicipios(uf: String) :Observable<Municipios[]>{   
    return this.http.get<any>(`${this.url}/${uf}`);
  }



}


