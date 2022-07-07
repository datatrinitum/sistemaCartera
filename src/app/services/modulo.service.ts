import { Injectable } from '@angular/core';
import { NgxSoapService, Client } from 'ngx-soap';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private _loading: boolean;
  private _showDiagnostic: boolean;
  private _message: string;
  private _xmlResponse: string;
  private _jsonResponse: string;
  private _resultLabel: string;
  private _client: Client;

  constructor(private soap: NgxSoapService) {
    this.soap.createClient('http://localhost/administracion/seguridad/Process_Service/ES_Process_Service.asmx?WSDL')
      .then(client => {
        console.log('Client', client);
        this._client = client;
      })
      .catch(err => console.log('Error', err));
  }

  consultarModulos(usuario:string){
    this._loading = true;
    const TIPO: Number = 1;
    const body = {
        NumMetodo: TIPO,
        Parameters: usuario
    };
    this._client.call('ESLoginMethods', body).subscribe(res => {
        this._xmlResponse = res.responseBody;
        this._message = res.result.ESLoginMethodsResult;
        this._loading = false;
    }, err => console.log(err));
}
}
