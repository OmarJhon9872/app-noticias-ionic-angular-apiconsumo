import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

    @ViewChild(IonSegment) segmento: IonSegment;

    categorias = ['business','entertainment','general','health','science','sports','technology'];
    noticias: Article[] = [];

    constructor(private noticiasService: NoticiasService) { }

    ngAfterViewInit() {
        this.segmento.value = this.categorias[0];
    }

    ngOnInit(){

        this.cargarNoticiasCategoria(this.categorias[0]);
    }

    //Metodo padre que llama a las demas noticias
    cargarNoticiasCategoria(categoria: string, event? ){
        return this.noticiasService.getTopHeadLinesCategoria(categoria ?? this.categorias[0])
        .subscribe( res => {
            console.log("Servicio de carga", res);
            this.noticias.push(...res.articles);

            if(event){
                event.target.complete();
            }
            if( res.articles.length == 0 ){
                event.target.disabled = true;
            }
        });
    }

    cambioCategoria(event){
        this.noticias = [];
        this.cargarNoticiasCategoria(event.detail.value);
    }

    loadData(event){
        this.cargarNoticiasCategoria( this.segmento.value, event );
    }

}
