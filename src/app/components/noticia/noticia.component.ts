import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

    @Input() noticia: Article;
    @Input() i: number;

    constructor() { }

    ngOnInit() { }

    abrirNoticia(){
        console.log("Noticia", this.noticia.url);
    }

}
