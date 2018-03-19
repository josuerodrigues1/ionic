/** Classe criado pelo ionic atraves do comando
 * ionic g provider carros.service
 * 
 * Essa comando cria e já coloca la no modulo principal na parte de providers
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosServiceProvider {

  /**
   * Ele injeta o http errado, tenho que mudar para o httpclient
   * 
   */
  constructor(private _http: HttpClient) {
  }

  lista() {
                        //isso é massa.. é so fazer o cast, não precisa mais de map e tudo mais.    
    return this._http.get<Carro[]>('http://localhost:8090/api/carro/listaTodos');
  }

}
//Comments
//se der o erro, não encontrei o provider HttpClient é pq precisa injetar la no modulo principal