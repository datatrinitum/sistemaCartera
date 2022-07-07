
import { Injectable } from '@angular/core';
import { NgxSoapService, Client } from 'ngx-soap';

@Injectable()
export class UsuarioService{
    private _loading: boolean;
    private _showDiagnostic: boolean;
    private _message: string;
    private _xmlResponse: string;
    private _jsonResponse: string;
    private _resultLabel: string;
    private _client: Client;

    //variables de consulta de los metodos
    private _tipo: number = 1; //Establece el id del tipo de operacion
    arr: Array<object> = [];
    private _usuario: string;
    private _pass: string;

    constructor(private soap: NgxSoapService) {
        this.soap.createClient('http://localhost/administracion/seguridad/Process_Service/ES_Process_Service.asmx?WSDL')
          .then(client => {
            console.log('Client', client);
            this._client = client;
          })
          .catch(err => console.log('Error', err));
      }
    
    ingresar(usuario:string, pass:string){
        this._loading = true;
        const body = {
            NumMetodo: this._tipo,
            Parameters: this.arr
        };
        this._client.call('ESLoginMethods', body).subscribe(res => {
            this._xmlResponse = res.responseBody;
            this._message = res.result.ESLoginMethodsResult;
            this._loading = false;
        }, err => console.log(err));
    }
}