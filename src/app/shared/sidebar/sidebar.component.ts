//import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccesosService } from '../../accesos.service';
//import { ClientesService } from '../../clientes.service';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  // template: `<p>{{ username }}</p>`,
})
export class SidebarComponent {
  searchTerm: string = '';
  username: string = '';
  usuario : string | undefined;
 // AccesosService: any[] = [];
  valor: string = '';  
   //constructor(private http: HttpClient) {}
   constructor(private AccesosService: AccesosService) { }

  // constructor(  
  //   private accesosRepuestosService : AccesosRepuestosService
  // ) {}

  ngOnInit(): void {
    let cookies = document.cookie.split("; ");   
    let username = cookies.find(cookie => cookie.startsWith("username="))?.split("=")[1] ?? "";
    let idsitema = '17';

    const userElement = document.getElementById("user");
    if (userElement) {
        userElement.innerText = username;
    }
      this.usuario  = 'AHERESMANN';
     username = this.usuario;
    console.log(username);
    
    this.AccesosService.getAccesos(this.searchTerm,username,idsitema).subscribe(data => {
      this.AccesosService = data;
      validaAccesos(data);
    });    
  }
}

// interface getAccesos {  
//   IDFuncionalidades:string; 
//   describeFuncionalidad:string; 
// };


function validaAccesos(data:any) { 
    console.log(data);    
    data.forEach((item:any) => {
      switch (item.IDFuncionalidades) {
        case '52':
         // console.log('mostrar mayorista');          
          document.getElementById("liEscala")!.classList.remove("d-none");
          break;
        case '53':
        //  console.log('mostrar ranking');
          document.getElementById("liAdmUsuario")!.classList.remove("d-none");
          break;
        case '54':
        //  console.log('mostrar venta');
          document.getElementById("liEmiComision")!.classList.remove("d-none");          
          break;
        default:
          console.log('Funcionalidad no reconocida');
      }
    });      
}