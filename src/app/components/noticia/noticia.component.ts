import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

    @Input() noticia: Article;
    @Input() i: number;
    @Input() esPaginaFavoritos;

    constructor(private iab: InAppBrowser,
                private actionSheetCtrl: ActionSheetController,
                private socialSharing: SocialSharing,
                private dataLocalService: DataLocalService,
                private toastController: ToastController
    ) { }

    ngOnInit() { }

    //Para esta funcion, se instalo la dependencia en la documentacion
    //Se importa en los modulos principales del proyecto, App\app.module.ts
    abrirNoticia() {
        //console.log("Noticia", this.noticia.url);
        const browser = this.iab.create(this.noticia.url, '_system');
        //browser.executeScript(...);
        //browser.insertCSS(...);
        //browser.on('loadstop').subscribe(event => {
        //browser.insertCSS({ code: "body{color: red;" });
        //});
        //browser.close();
    }
    async lanzarMenu() {

        let guardarBorrarBtn: any;

        if(this.esPaginaFavoritos){
            guardarBorrarBtn = {
                text: 'Eliminar de favoritos',
                icon: 'trash',
                cssClass: 'action-dark',
                handler:  () => {
                    this.dataLocalService.borrarNoticia(this.noticia);
                }
            };
        }else{
            guardarBorrarBtn = {
                text: 'Favorito',
                icon: 'heart',
                cssClass: 'action-dark',
                handler: () => {

                    this.dataLocalService.guardarNoticia(this.noticia);

                }
            };
        }

        const actionSheet = await this.actionSheetCtrl.create({
            backdropDismiss: false,
            buttons: [{
                text: 'Compartir',
                icon: 'share',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Share clicked');

                    //Compartir
                    this.socialSharing.share(
                        this.noticia.title,
                        this.noticia.source.name,
                        '',
                        this.noticia.url
                    );
                }
            },
            guardarBorrarBtn,
            {
                text: 'Cancelar',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

}
