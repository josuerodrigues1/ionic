import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
/**
 *  criei esse NavLifeCycles so para não errar os nomes dos métodos
 */
export class HomePage implements NavLifecycles {

  public carros: Carro[];

  /**
   * inicialmente o Http estava aqui.. mas ele foi para a classe service.(providers)
  * se der o erro, não encontrei o provider HttpClient é pq precisa injetar la no modulo principal
  * é BOM DEIXAR O CONSTRUTOR SO PARA INJECAO DE DEPENDENCIAS
  */
 constructor(
   
    public navCtrl: NavController,
    
    //para colocar o loading .. não precisa modulo principal
    //vou usar o metodo create dele.. que retorna um objeto loading
    private _loadingCtrl: LoadingController, 
    
    /** 
     * Alerta, nao precisa tbm colocar no modulo
    */
    private _alertCtrl: AlertController,
    
    /** 
     * O Service que eu criei para isolar a API carros
     * É necessário colocar la no modulo principal, na parte de Providers
    */
    private _carrosService: CarrosServiceProvider) {}

  /**
   * Antes era usado o ngOnInit, mas isso não é angular2.. entao vamos usar o do ionic
   * 
   * Esse metodo é executado quando ele termina de carrega a página
   * criou dentro do src - o utils ele criou o lifecicles.. so para não errar o nome
   */
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando carros...' //define o que vai ta escrito no loading
    });

    loading.present(); // mostrar o loading

    this._carrosService.lista()
              /**
               *  o metodo retorna um Observable, ai tenho que me inscrever(subscribe) nele
               *  para ter acesso ao callback
               */
              .subscribe(
                //arrow function 
                //callback sucesso
                (carros) => {
                  this.carros = carros;
                  loading.dismiss(); //desaparecer o loading
                },
                //callback erro
                (err: HttpErrorResponse) => {
                  console.log(err);

                  loading.dismiss(); //desaparecer o loading

                  /** Criando o alert com seus atributos */
                  this._alertCtrl.create({
                    title: 'Falha na conexão',
                    subTitle: 'Não foi possível carregar a lista de carros. Tente novamente mais tarde!',
                    buttons: [
                      { text: 'Ok' }
                    ]
                  }).present(); // não esquecer do present
                }
              );
  }

  /**
   * Quando clicar em um carro, vai chamar esse metodo
   * 
   */
  selecionaCarro(carro: Carro) {
    console.log(carro);
    
    /**
     * Ele empilha a nova pagina atras do PUSH
     * 
     * Os parametros sao:
     * 1 - o nome da Pagina que deve ser carregada - NAO ENVIAR A STRING, enviar do jeito que ta ai
     * 2 - Qualquer argumento que eu queria passar para a proxima pagina
     * vou pegar la no contrutor da EscolhaPage atraves do navParams(olhar la no EscolhaPage)
     */
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });


  }

}
