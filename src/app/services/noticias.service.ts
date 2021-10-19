import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

var apiKey = environment.apiKey;
var apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
    'X-Api-Key': apiKey
});

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {

    paginaHeadlines = 0;

    categoriaActual = '';
    categoriaPage = 0;

    constructor(private http: HttpClient) { }

    //Emite un tipo, funcion generica <T> se adapta al tipo de dato que recibe
    //private ejecutarQuery<T>( query: string){
    private ejecutarQuery( query: string){
        query = apiUrl + query;
        //return this.http.get<RespuestaTopHeadlines>(query, {headers});
        return this.http.get<RespuestaTopHeadlines>(query, {headers});
    }

    getTopHeadLines(){
        this.paginaHeadlines ++;
        return this.ejecutarQuery(`/top-headlines?country=mx&category=technology&page=${this.paginaHeadlines}`);
    }

    getTopHeadLinesCategoria( categoria: string ){

        //Si la categoria que se va a cargar es la actual
        if(this.categoriaActual == categoria){
            this.categoriaPage++;
        }else{
            this.categoriaPage = 1;
            this.categoriaActual = categoria;
        }
        //return this.http.get<RespuestaTopHeadlines>(`${apiUrl}/top-headlines?country=mx&category=${categoria}`);
        return this.ejecutarQuery(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);
    }
}
