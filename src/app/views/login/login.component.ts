import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent { 
  private _usuarioService: UsuarioService;
  usuario: string;
  pass: string;

  constructor(private usuarioService: UsuarioService){
    this._usuarioService = usuarioService;
  }

  procesarLogin(){
    this._usuarioService.ingresar(this.usuario, this.pass);  
  }
}
