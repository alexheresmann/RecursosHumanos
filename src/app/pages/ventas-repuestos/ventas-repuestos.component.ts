declare var Swal: any; // Declaración global para usar SweetAlert2

import { Component, OnInit  } from '@angular/core';
import { VentasRepuestosService } from '../../ventasRepuestos.service';
import { OficinasRepuestosService } from '../../oficinasRepuestos.service';

import { Subject } from 'rxjs';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-ventas-repuestos',
  templateUrl: './ventas-repuestos.component.html',
  styleUrls: ['./ventas-repuestos.component.css']
})

export class VentasRepuestosComponent implements OnInit {
  searchTerm: string = '';
  Array_ventasrepuestos: any[] = [];
  oficinasRepuestos: any[] = [];
  usuario : string | undefined;
  isLoading: boolean = false;

  constructor( private VentasRepuestosService: VentasRepuestosService,
    private oficinasRepuestosService : OficinasRepuestosService
  ) {}

  ngOnInit(): void {

     let cookies = document.cookie.split("; ");
     let username = cookies.find(cookie => cookie.startsWith("username="))?.split("=")[1];
     console.log(username);   
     this.usuario = username;
     
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

  }  

  onSearch(): void {

      const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement).value; 
      let desde = (document.getElementById('fechaDesde') as HTMLInputElement).value; 
      let hasta = (document.getElementById('fechaHasta') as HTMLInputElement).value; 
      
      desde = desde.replace(/-/g, ''); 
      hasta = hasta.replace(/-/g, ''); 

      if (!desde || !hasta || !codigoOficina) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
          confirmButtonText: 'Aceptar'
        });
        return; // Si alguno está vacío, detener la ejecución
      }      
      //console.log(desde);      
      //console.log(hasta);
      //console.log(codigoOficina);     
      
      this.isLoading = true; // Mostrar spinner
      this.VentasRepuestosService.getVentasRepuestos(this.searchTerm, codigoOficina,desde,hasta).subscribe(data => {
      this.Array_ventasrepuestos = data;
      //console.log(data);
      carga_tabla_BD(data);
      this.isLoading = false;
      });
  }
  
  generarEXCEL() {      
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('VentaRepuestos');
      
      // Obtener valores de los filtros
      const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement).value;
      let desde = (document.getElementById('fechaDesde') as HTMLInputElement).value; 
      let hasta = (document.getElementById('fechaHasta') as HTMLInputElement).value; 
      
      if (!desde || !hasta || !codigoOficina) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
          confirmButtonText: 'Aceptar'
        });
        return; // Si alguno está vacío, detener la ejecución
      } 
      this.isLoading = true; // Mostrar spinner
      const selectElement = document.getElementById('selectOficinas') as HTMLSelectElement;
      const textoOficina = selectElement.options[selectElement.selectedIndex].text;
  
      let desdeFormato = desde.replace(/-/g, ''); 
      let hastaFormato = hasta.replace(/-/g, ''); 
                
      let fechaActual = new Date();
      let fecha = fechaActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      let hora = fechaActual.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });      

      // Añadir título
      worksheet.addRow([`Repuestos Vendidos entre el: ${desde} y el:  ${hasta}`]);
      worksheet.addRow([`Oficina: ${textoOficina}`]); 
      worksheet.addRow([`Fecha: ${fecha} Hora: ${hora}`]); 
    
      worksheet.getColumn(1).width = 16;
      worksheet.getColumn(2).width = 6;
      worksheet.getColumn(3).width = 50;
      worksheet.getColumn(4).width = 17;
      worksheet.getColumn(5).width = 11;
      worksheet.getColumn(6).width = 10;
      worksheet.getColumn(7).width = 11;
      worksheet.getColumn(8).width = 14;

    
      // Establecer encabezados en la fila 4
      worksheet.getRow(4).values = [
        'Codigo', 'Sufijo','Descripcion', 'UnidadesVendidas','Ult.Compra','StockFísico','CostoMedio', 'NetoFabricante'
      ];


      for (let i = 1; i <= 4; i++) {
        const fila = worksheet.getRow(i);
        
        fila.eachCell({ includeEmpty: true }, (cell) => {                   
          // Aplicar negrita a la fuente
          cell.font = { bold: true };
        });
      }

      const fila = worksheet.getRow(4);
      fila.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB3E5FC' }  // Azul pastel
        };      
      });   

      this.VentasRepuestosService.getVentasRepuestos(this.searchTerm, codigoOficina,desdeFormato,hastaFormato).subscribe(data => {  
        this.Array_ventasrepuestos = data;

        //console.log(data);
      
      $.each(data, function (i, value) {	
        worksheet.addRow([
          this.Codigo,
          this.Sufijo,
          this.Descripcion ,
          Number(this.UnidadesVendidas),
          this.UltimaCompra,
          Number(this.StockActual),
          Number(this.CostoMedio),
          Number(this.NetoFabricante)
        ]);	
      });

    // Aplicar bordes a un rango de celdas (A1 a E5)
    const range = worksheet.getCell('A5:H5');

    for (let row = 4; row <= this.Array_ventasrepuestos.length + 4 ; row++) {
      for (let col = 1; col <= 8; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    }
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'VentasRepuestos.xlsx');
      });

      });
      this.isLoading = false; // Mostrar spinner
    }

   generarPDF() {

    const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement).value;
    let desde = (document.getElementById('fechaDesde') as HTMLInputElement).value; 
    let hasta = (document.getElementById('fechaHasta') as HTMLInputElement).value; 
    
    const selectElement = document.getElementById('selectOficinas') as HTMLSelectElement;
    const textoOficina = selectElement.options[selectElement.selectedIndex].text;

    let desdeFormato = desde.replace(/-/g, ''); 
    let hastaFormato = hasta.replace(/-/g, ''); 

    //console.log(codigoOficina);
    if (!desde || !hasta || !codigoOficina) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return; // Si alguno está vacío, detener la ejecución
    } 
    this.isLoading = true; // Mostrar spinner    

    //moneda
    const currencyFormat = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });      
  
    this.VentasRepuestosService.getVentasRepuestos(this.searchTerm, codigoOficina,desdeFormato,hastaFormato).subscribe(data => {

        this.Array_ventasrepuestos = data;
        //console.log(data);

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.height;
        const currentDate = new Date().toLocaleDateString();
        const headers = ['Código', 'Sufijo', 'Descripción', 'UnidadesVendidas', 'UltimaCompra', 'StockActual','CostoMedio', 'NetoFabricante'];
        interface VentaRepuestosPDF {
            Codigo: string;
            Sufijo: string;
            Descripcion: string;
            UnidadesVendidas: number;
            UltimaCompra: string;
            StockActual: number;
            CostoMedio: number;
            NetoFabricante: number;
        }
        const rows = data.map((VentaRepuestosPDF: VentaRepuestosPDF) => [
          VentaRepuestosPDF.Codigo,
          VentaRepuestosPDF.Sufijo,
          VentaRepuestosPDF.Descripcion,
          VentaRepuestosPDF.UnidadesVendidas,
          VentaRepuestosPDF.UltimaCompra,
          VentaRepuestosPDF.StockActual,
          currencyFormat.format(Number(VentaRepuestosPDF.CostoMedio)),
          currencyFormat.format(Number(VentaRepuestosPDF.NetoFabricante))
        ]);
        const img = new Image();
        img.src = '../assets/dist/img/kovacs.jpg'; // Ruta de la imagen
    
        const addHeader = (pageNum: number) => {
          pdf.addImage(img, 'JPEG', 10, 5, 40, 20);       
      
          
          pdf.setFontSize(7);
          pdf.text('Oficina : ' + textoOficina, 10, 28);  
                    
          pdf.setFont("helvetica", "bold");      
          pdf.setFontSize(10);
          pdf.text('Venta de Repuestos por Fecha', 70, 10);
          const textWidth = pdf.getTextWidth('Venta de Repuestos por Fecha');
          pdf.line(70, 11, 70 + textWidth + 1, 11); // Coordenadas: (x1, y1) a (x2, y2)

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.text(`Fecha: ${currentDate}`, 170, 10);
          pdf.text(`Página ${pageNum}`, 170, 15);

          pdf.text(`Desde: ${desde}`, 74, 15);
          pdf.text(`Hasta: ${hasta}`, 97, 15);

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
                  0: { fontSize: 9 }, 
                  1: { fontSize: 9 }, 
                  2: { fontSize: 6 }, 
                  3: { fontSize: 9 }, 
                  4: { fontSize: 8 },
                  5: { fontSize: 9},
                  6: { fontSize: 9},
                  7: { fontSize: 9}
              } ,   
            });
        }
        // Guardar el PDF
        this.isLoading = false; // Mostrar spinner  
        pdf.save('InformeVentadeRepuestos_PorFecha.pdf');
    }); 
}
}

interface Oficina {
  oficina: string;
  sucursal: string;
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
        cuerpoTabla += '<td>'+this.Codigo+'</td>'  
        cuerpoTabla += '<td>'+this.Sufijo+'</td>'  
        cuerpoTabla += '<td>'+this.Descripcion+'</td>'  
        cuerpoTabla += '<td>'+this.UnidadesVendidas+'</td>'  
        cuerpoTabla += '<td>'+this.UltimaCompra+'</td>'  
        cuerpoTabla += '<td>'+this.StockActual+'</td>'  
        cuerpoTabla += '<td>'+this.CostoMedio+'</td>'  
        cuerpoTabla += '<td>'+this.NetoFabricante+'</td>'  
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
    +'<th>Codigo</th>'
    +'<th>Sufijo</th>'
    +'<th>Descripcion</th>'
    +'<th>UnidadesVendidas</th>'
    +'<th>UltimaCompra</th>'
    +'<th>StockFísico</th>'
    +'<th>CostoMedio</th>'
    +'<th>NetoFabricante</th>'
    +'</tr> </thead>'    
    +cuerpoTabla
    +'</table>');
    $('#DTable').DataTable({
       "language": {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"},
        "columnDefs": [{"className": "dt-center", "targets": "_all"}],
      pageLength: 20, // Limitar a un máximo de 15 registros por página
      processing: true,     
      dom: 'Bfrtip',
      order: [[3, 'desc']] 
     });  
}	



