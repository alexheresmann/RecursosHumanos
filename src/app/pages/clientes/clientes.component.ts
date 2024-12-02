import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientesService } from '../../clientes.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  searchTerm: string = '';
  clientes: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private clientesService: ClientesService) {}
  ngOnInit(): void {
     // Cargar datos y luego inicializar DataTable
     this.clientesService.getClientes(this.searchTerm).subscribe(data => {
      this.clientes = data;
      carga_tabla_BD(data);
    });
  }
  
  onSearch(): void {
    this.clientesService.getClientes(this.searchTerm).subscribe(data => {
      this.clientes = data;
      carga_tabla_BD(data);     
    });
  }
}
function carga_tabla_BD(data: any) {	
  var lista_Publicados: {
    Nombre: any;
    Rut: any; 
    Fono: any;
  }[] =  [];
  var cuerpoTabla  = '';
  var list = 0;
  $.each(data, function (i, value) {	
        cuerpoTabla += '<tr>'
        cuerpoTabla += '<td>'+this.B_NOP903+'</td>'  
        cuerpoTabla += '<td>'+this.B_RUT903+'</td>'  
        cuerpoTabla += '<td>'+this.B_FOM903+'</td>'  
        cuerpoTabla += '</tr>'
        list++;			
  });
  if ($.fn.DataTable.isDataTable('#clientesTable')) {
    $('#clientesTable').DataTable().destroy();  // Destruir la instancia existente si ya está inicializada
  }
  	//console.log(data);	
		$("#clientesTable").html('');	
		$("#clientesTable").html('<table class="table w-100 table-sm table-striped table-bordered table-hover " id="clientesTable" style="font-size:10px;">'	
    +'<thead style=" background-color: black; color: white;">'            
    +'<tr>'
    +'<th>Nombre</th>'
    +'<th>Rut</th>'
    +'<th>Teléfono</th>'
    +'</tr> </thead>'    
    +cuerpoTabla
    +'</table>');
    $('#clientesTable').DataTable({
      // "language": {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"},
     pageLength: 15, // Limitar a un máximo de 15 registros por página
     processing: true,
       "columnDefs": [{"className": "dt-center", "targets": "_all"}],
      dom: 'Bfrtip',
     });  
	}	


// import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';
// import 'datatables.net';
// //import * as $ from 'jquery';
// //import { DataTables } from 'datatables.net'; // Asegúrate de importar DataTables aquí
// //import DataTables from "datatables.net";
// @Component({
//   selector: 'app-clientes',
//   templateUrl: './clientes.component.html',
//   styleUrls: ['./clientes.component.css']
// })
// export class ClientesComponent implements OnInit, AfterViewInit, OnDestroy {
//  // dtOptions: DataTables.Settings = {};
//   dtTrigger: Subject<any> = new Subject<any>();
//   clientes: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     // this.dtOptions = {
//     //   pagingType: 'full_numbers',
//     //   pageLength: 10,
//     //   responsive: true
//     // };
//     this.loadClientes();
//   }

//   loadClientes(): void {
//     this.http.get<any[]>('https://your-api-endpoint/clientes')
//       .subscribe(data => {
//         this.clientes = data;
//        // this.dtTrigger.next();
//       });
//   }

//   ngAfterViewInit(): void {
//     // Inicializar DataTables después de que la vista se haya inicializado completamente
//     //$('#clientesTable').DataTable(this.dtOptions);
//   }

//   ngOnDestroy(): void {
//     // Destruir el Subject cuando el componente sea destruido
//     this.dtTrigger.unsubscribe();
//   }
// }




