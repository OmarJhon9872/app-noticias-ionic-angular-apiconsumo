import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.component.html',
    styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

    @Input() noticias: Article[] = [];
    @Input() esPaginaFavoritos = false;


    constructor() {
        
     }

    ngOnInit() { 
        console.log("favoritos",this.esPaginaFavoritos);
    }

}
