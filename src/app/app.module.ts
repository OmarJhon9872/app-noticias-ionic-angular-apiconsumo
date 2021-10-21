import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Plugin de capacitor para abrir url en navegadores, esta en providers y
//en app\pages\noticia.component.ts
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//Implementado en App\components\noticia\noticia.component.ts
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//Implementado en el servicio de almacenarNoticias
import { IonicStorageModule } from '@ionic/storage-angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
    ],
    providers: [
        InAppBrowser,
        SocialSharing,
        NativeStorage,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
