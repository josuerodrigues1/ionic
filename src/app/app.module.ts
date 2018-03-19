import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';

import 'rxjs/add/operator/finally';

@NgModule({
  declarations: [
    MyApp,
    HomePage
    //EscolhaPage.. no curso ele coloca aqui... nao sei pq nao apareceu
  ],
  imports: [
    BrowserModule,
    
    //para que seja possível usar o HttpClient nos componentes(nao esquecer o import la em cimae)
    HttpClientModule,
    
    //Define o componente Principal MyApp - import { MyApp } from './app.component';
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
    //EscolhaPage.. no curso ele coloca aqui... nao sei pq nao apareceu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    /** 
     * Colocado aqui pelo ionic no momento que eu dei o comando pra ele criar o providers
     * e o import la em cima
    */
    CarrosServiceProvider,
    /** 
     *
    */
    
    AgendamentosServiceProvider
  ]
})
export class AppModule {}
