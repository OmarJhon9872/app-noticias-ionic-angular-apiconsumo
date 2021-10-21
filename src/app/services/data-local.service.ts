import { Injectable, OnInit } from '@angular/core';
import { Article } from '../interfaces/interfaces';
//import { StorageService } from './storage.service';

import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class DataLocalService implements OnInit {

    noticias: Article[] = [];

    private _storage: Storage | null = null;

    constructor(private storage: Storage,
        private toastController: ToastController
    ) {
        this.init();
        this.cargarFavoritos();
    }
    //Storage
    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }


    ngOnInit() { }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

    guardarNoticia(noticia: Article) {

        const existe = this.noticias.find(noti => noti.title == noticia.title);

        if (!existe) {
            this.noticias.unshift(noticia);
            this.storage.set('favoritos', this.noticias);
        }

        this.presentToast("Noticia agregada a favoritosS");
    }
    borrarNoticia(noticia: Article) {
        this.noticias = this.noticias.filter((noti: Article) => {
            return noti.title != noticia.title;
        });
        this.storage.set('favoritos', this.noticias);
        this.presentToast("Noticia eliminada de favoritos");
    }

    async cargarFavoritos() {
        const favoritos = await this.storage.get('favoritos');
        if (favoritos) {
            this.noticias = favoritos;
        }
    }
}
