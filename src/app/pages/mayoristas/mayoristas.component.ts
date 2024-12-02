declare var Swal: any; // Declaración global para usar SweetAlert2

import { Component, OnInit } from '@angular/core';
import { MayoristasService } from '../../mayoristas.service';
import { OficinasRepuestosService } from '../../oficinasRepuestos.service';
import { IngenieriasService } from '../../ingenierias.service';
import { ParametrosRepuestosService } from '../../parametros-repuestos.service';

import { Subject } from 'rxjs';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mayoristas',
  templateUrl: './mayoristas.component.html',
  styleUrls: ['./mayoristas.component.css']
})
export class MayoristasComponent implements OnInit {
  searchTerm: string = '';
  mayoristas: any[] = [];
  oficinasRepuestos: any[] = [];
  ingenierias: any[] = [];
  grupos: any[] = [];  
  usuario : string | undefined;
  isLoading: boolean = false;
  //dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();
  // constructor(private MayoristasService: MayoristasService) {}


  constructor( private MayoristasService: MayoristasService,
    private ingenieriasService: IngenieriasService,
    private parametrosRepuestosService : ParametrosRepuestosService,
    // private modelosService: ModelosService,
    private oficinasRepuestosService : OficinasRepuestosService
  ) {}

  ngOnInit(): void {
     // Cargar datos y luego inicializar DataTable
     //this.MayoristasService.getMayoristas(this.searchTerm).subscribe(data => {
      //this.mayoristas = data;
     // carga_tabla_BD(data);

     this.ingenieriasService.getIngenierias(this.searchTerm).subscribe(data => {
      this.ingenierias = data;
     llena_ingenierias(data);
    });     
    
    this.parametrosRepuestosService.getGrupos(this.searchTerm).subscribe(data => {
      this.grupos = data;
      //console.log(data);
      llena_grupos(data);
    });  
    
    
     let cookies = document.cookie.split("; ");
     let username = cookies.find(cookie => cookie.startsWith("username="))?.split("=")[1];
     console.log(username);   
     this.usuario = username;
     //console.log(this.usuario);

     //this.usuario = "fherrera";  //sin coockie FHL
     //console.log(this.usuario);

     if (this.usuario !== undefined) {
      this.oficinasRepuestosService.getOficinasRepuesto(this.searchTerm, this.usuario).subscribe(data2 => {;
      //this.oficinasRepuestosService.getOficinasRepuesto(this.searchTerm).subscribe(data2 => {
        this.oficinasRepuestos = data2;
        llena_oficinas(data2);
        console.log(data2);
      }); 
    }
   // });    
  }  
  // onSearch(): void {
  //   this.MayoristasService.getMayoristas(this.searchTerm).subscribe(data => {
  //     this.mayoristas = data;
  //     carga_tabla_BD(data);   
  //    // generarPDF(data);  
  //   });
  // }

  onSearch(): void {
    // Obtén el valor del select con el id 'selectOficinas'
      const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement).value;
      const codigoGrupo = (document.getElementById('selectGrupos') as HTMLSelectElement).value;
      const codigoingenieria = (document.getElementById('selectIngenierias') as HTMLSelectElement).value;
            
      if (!codigoOficina || !codigoGrupo || !codigoingenieria ) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
          confirmButtonText: 'Aceptar'
        });
        return; // Si alguno está vacío, detener la ejecución
      }  

      this.isLoading = true; // Mostrar spinner
    // Llama al servicio pasando los dos parámetros: searchTerm y oficinaId
      this.MayoristasService.getMayoristasFiltro(this.searchTerm, codigoOficina,codigoGrupo,codigoingenieria).subscribe(data => {
      this.mayoristas = data;
      carga_tabla_BD(data);
      this.isLoading = false;
      // generarPDF(data);
    });
  }
  generarPDF() {
    const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement).value;
    const codigoGrupo = (document.getElementById('selectGrupos') as HTMLSelectElement).value;
    const codigoingenieria = (document.getElementById('selectIngenierias') as HTMLSelectElement).value;    
    
    const selectElement = document.getElementById('selectOficinas') as HTMLSelectElement;
    const textoOficina = selectElement.options[selectElement.selectedIndex].text;

    const selectElementgrupo = document.getElementById('selectGrupos') as HTMLSelectElement;
    const textoGrupo = selectElementgrupo.options[selectElementgrupo.selectedIndex].text;

    const selectElementIngenieria= document.getElementById('selectIngenierias') as HTMLSelectElement;
    const textoIngenieria = selectElementIngenieria.options[selectElementIngenieria.selectedIndex].text;

    //console.log(codigoOficina);
  
    if (!codigoOficina || !codigoGrupo || !codigoingenieria ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return; // Si alguno está vacío, detener la ejecución
    }  
        //moneda
        const currencyFormat = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });    
        this.isLoading = true; // Mostrar spinner
        // Llama al servicio pasando los dos parámetros: searchTerm y oficinaId
        this.MayoristasService.getMayoristasFiltro(this.searchTerm, codigoOficina,codigoGrupo,codigoingenieria).subscribe(data => {
        this.mayoristas = data;
        // Crear una nueva instancia de jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.height;
        const currentDate = new Date().toLocaleDateString();
        const headers = ['Grupo', 'Ingeniería', 'Código', 'Descripción', 'Stock Físico', 'Neto Lista'];

        interface Mayorista {
            Grupo: string;
            Ingenieria_Corta: string;
            Codigo: string;
            Descripcion: string;
            StockFisico: number;
            Mayorista: string;          
        }
        const rows = data.map((mayorista: Mayorista) => [
            mayorista.Grupo,
            mayorista.Ingenieria_Corta,
            mayorista.Codigo,
            mayorista.Descripcion,
            mayorista.StockFisico,
            currencyFormat.format(Number(mayorista.Mayorista))
        ]);
        const img = new Image();
        img.src = '../assets/dist/img/kovacs.jpg'; // Ruta de la imagen
    
        const addHeader = (pageNum: number) => {
          pdf.addImage(img, 'JPEG', 10, 5, 40, 20);       
      
          pdf.setFontSize(7);
          pdf.text('Oficina : ' + textoOficina, 10, 28);  

          pdf.setFont("helvetica", "bold");      
          pdf.setFontSize(12);
          pdf.text('Lista De Precios Mayoristas Para Vendedores', 70, 10);
          const textWidth = pdf.getTextWidth('Lista De Precios Mayoristas Para Vendedores');
          pdf.line(70, 11, 70 + textWidth + 1, 11); // Coordenadas: (x1, y1) a (x2, y2)                 
          
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.text(`Fecha: ${currentDate}`, 170, 10);
          pdf.text(`Página ${pageNum}`, 170, 15);
          pdf.text(`Grupo: ${textoGrupo}`, 74, 15);
          pdf.text(`ingeniería: ${textoIngenieria}`, 97, 15);   
      };  
            
        // Inicializar el número de página
        let pageNum = 1;
        // Agregar la tabla
        const totalPages = Math.ceil(rows.length / 37); // Supongamos que puedes mostrar 37 filas por página
        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage(); // Agregar nueva página después de la primera
            addHeader(pageNum++);
            autoTable(pdf, {
                head: [headers],
                body: rows.slice(i * 37, (i + 1) * 37), // Cargar solo las filas para la página actual
                startY: 30,
                margin: { horizontal: 10 },
                theme: 'grid',
                styles: {
                    fontSize: 9,
                    cellPadding: 2,
                    overflow: 'linebreak'
                },
                columnStyles: {
                  0: { fontSize: 10 }, 
                  1: { fontSize: 9 }, 
                  2: { fontSize: 11 }, 
                  3: { fontSize: 7 }, 
                  4: { fontSize: 11 },
                  5: { fontSize: 11}
              }        
            });
        }
        this.isLoading = false;
        // Guardar el PDF
        pdf.save('Informe Mayoristas.pdf');
    });
}
}

interface Oficina {
  oficina: string;
  sucursal: string;
}
interface Ingenierias {
  DESCRIPCION: string;
  CODIGO: string;
}
interface Grupos {
  DESCRIPCION: string;
  CODIGO: string;
}

function llena_grupos(data: any) {
  const selectElement = document.getElementById('selectGrupos');
  if (!selectElement) {
      return;
  }
  selectElement.innerHTML = ''; // Limpiar cualquier opción existente
  data.forEach((item: Grupos)  => {
      const option = document.createElement('option');
      option.text = item.DESCRIPCION;
      option.value = item.CODIGO;
      selectElement.appendChild(option);
  });
}

function llena_oficinas(data3: any) {
  const selectElement = document.getElementById('selectOficinas');
  if (!selectElement) {
     // console.error('El elemento select con el id "selectOficinas" no se encontró.');
      return;
  }
  selectElement.innerHTML = ''; // Limpiar cualquier opción existente
  data3.forEach((item: Oficina)  => {
      const option = document.createElement('option');
      option.text = item.oficina;
      option.value = item.sucursal;
      selectElement.appendChild(option);
  });
}

function llena_ingenierias(data: any) {
  const selectElement = document.getElementById('selectIngenierias');
  if (!selectElement) {
      return;
  }
  selectElement.innerHTML = ''; // Limpiar cualquier opción existente
  data.forEach((item: Ingenierias)  => {
      const option = document.createElement('option');
      option.text = item.DESCRIPCION;
      option.value = item.CODIGO;
      selectElement.appendChild(option);
  });
}

function carga_tabla_BD(data: any) {	
  var lista_Publicados: {
    Nombre: any;
    Rut: any; 
    Fono: any;
  }[] =  [];

  var cuerpoTabla  = '';
  var list = 0;
//console.log(data);

  $.each(data, function (i, value) {	
        cuerpoTabla += '<tr>'
        cuerpoTabla += '<td>'+this.Grupo+'</td>'  
        cuerpoTabla += '<td>'+this.Ingenieria+'</td>'  
        cuerpoTabla += '<td>'+this.Codigo+'</td>'  
        cuerpoTabla += '<td>'+this.Descripcion+'</td>'  
        cuerpoTabla += '<td>'+this.StockFisico+'</td>'  
        cuerpoTabla += '<td>'+this.Mayorista+'</td>'  
        cuerpoTabla += '</tr>'
        list++;			
  });

  if ($.fn.DataTable.isDataTable('#DTable')) {
    $('#DTable').DataTable().destroy();  // Destruir la instancia existente si ya está inicializada
  }
  	//console.log(data);	
		$("#DTable").html('');	
		$("#DTable").html('<table class="table w-100 table-sm table-striped table-bordered table-hover " id="DTable" style="font-size:10px;">'	
    +'<thead style=" background-color: black; color: white;">'            
    +'<tr>'
    +'<th>Grupo</th>'
    +'<th>Ingenieria</th>'
    +'<th>Codigo</th>'
    +'<th>Descripcion</th>'
    +'<th>Stock Fisico</th>'
    +'<th>Neto Lista</th>'
    +'</tr> </thead>'    
    +cuerpoTabla
    +'</table>');
    $('#DTable').DataTable({
       "language": {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"},
        "columnDefs": [{"className": "dt-center", "targets": "_all"}],
      pageLength: 20, // Limitar a un máximo de 15 registros por página
      processing: true,     
     // dom: 'Bfrtip',
     });  
}	



