import { Component } from '@angular/core';
import { IngenieriasService } from '../../ingenierias.service';
import { OficinasService } from '../../oficinas.service';
import { RankingService } from '../../ranking.service';
import { TipoRepuestoService } from '../../tipoRepuesto.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking-repuestos',
  templateUrl: './ranking-repuestos.component.html',
  styleUrl: './ranking-repuestos.component.css'
})
export class RankingRepuestosComponent {
  searchTerm: string = '';
  oficinas: any[] = [];
  ingenierias: any[] = [];
  ranking: any[] = [];
  ingenieria: any[] = [];
  tipoRepuesto: any[] = [];
  cantidad: any[] = [];

  constructor(    
    private ingenieriasService: IngenieriasService,
    private oficinasService : OficinasService,
    private rankingService : RankingService,
    private tipoRepuestoService : TipoRepuestoService
  ) {}
  ngOnInit(): void {
    this.oficinasService.getOficiasRepuestos_all(this.searchTerm).subscribe(data3 => {
      this.oficinas = data3;
     llena_oficinas(data3);
     // console.log(data3);    
    }); 
    this.ingenieriasService.getIngenierias(this.searchTerm).subscribe(data => {
      this.ingenierias = data;
     llena_ingenierias(data);
    });     
    this.tipoRepuestoService.getTipoRepuesto(this.searchTerm).subscribe(data => {
      this.tipoRepuesto = data;
      llena_tipo_repuestos(data);
    });   
   // const fechaInput = document.getElementById('fechaHasta');
    const fechaInput = document.getElementById('fechaHasta') as HTMLInputElement;
    const hoy = new Date();
    const mesPasado = new Date(hoy.setMonth(hoy.getMonth() ));
    mesPasado.setDate(0); // Establecer el día en 1 (primer día del mes)
    // Formatear la fecha en formato 'YYYY-MM-DD'
    const mesPasadoFormateado = mesPasado.toISOString().split('T')[0];
      // Asignar la fecha mínima al input
      if (fechaInput) {
      fechaInput.max = mesPasadoFormateado;
      }
  }

  isLoading: boolean = false;

  onSearch(): void {
    // Obtener elementos y valores
    const cantidad = (document.getElementById('cantidadRepuestos') as HTMLInputElement)?.value || '';
    const fechaHasta = (document.getElementById('fechaHasta') as HTMLInputElement)?.value || '';
    const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement)?.value;
    const ingenieria = (document.getElementById('selectIngenierias') as HTMLSelectElement)?.value;
    const tipoRepuesto = (document.getElementById('tipoRepuesto') as HTMLSelectElement)?.value;

    const fecha_hasta = fechaHasta.replace(/-/g, ''); // Eliminar guiones de la fecha

    // Validar si la cantidad está vacía
    if (!cantidad) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor, ingresa una cantidad de repuestos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    // Validar si la fecha está vacía
    if (!fechaHasta) {
      Swal.fire({
        icon: 'warning',
        title: 'Seleccionar Fecha',
        text: 'Por favor, selecciona una fecha para el periodo.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    // Crear fecha con el formato deseado (agregar el primer día del mes)
    const fechaSeleccionada = new Date(`${fechaHasta}-01`);
    const fechaActual = new Date();  
       if (fechaSeleccionada < new Date(fechaActual.getFullYear(), fechaActual.getMonth()-1, 1)) {
          // Fecha válida
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Periodo no seleccionable',
            text: 'La fecha seleccionada no debe ser igual o superior al mes actual.',
          });
          return;
        }  
    // Mostrar el spinner
    this.isLoading = true;
  
    // Realizar la petición al servicio
    this.rankingService.getRanking(this.searchTerm, codigoOficina, `${fecha_hasta}01`, ingenieria, cantidad, tipoRepuesto)
      .subscribe(
        data => {
          this.ranking = data;
          carga_tabla_BD(data); // Cargar los datos obtenidos
          this.isLoading = false; // Ocultar el spinner
        },
        error => {
          console.error('Error al obtener los datos', error);
          this.isLoading = false; // Ocultar el spinner en caso de error
        }
      );
  }
  generateExcel(): void {
       // Obtener elementos y valores
        const cantidad = (document.getElementById('cantidadRepuestos') as HTMLInputElement)?.value || '';
        const fechaHasta = (document.getElementById('fechaHasta') as HTMLInputElement)?.value || '';
        const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement)?.value;
        const ingenieria = (document.getElementById('selectIngenierias') as HTMLSelectElement)?.value;
        const tipoRepuesto = (document.getElementById('tipoRepuesto') as HTMLSelectElement)?.value;    
        const fecha_hasta = fechaHasta.replace(/-/g, ''); // Eliminar guiones de la fecha
    
        // Validar si la cantidad está vacía
        if (!cantidad) {
          Swal.fire({
            icon: 'warning',
            title: 'Campo requerido',
            text: 'Por favor, ingresa una cantidad de repuestos.',
            confirmButtonText: 'Entendido'
          });
          return;
        }
        // Validar si la fecha está vacía
        if (!fechaHasta) {
          Swal.fire({
            icon: 'warning',
            title: 'Seleccionar Fecha',
            text: 'Por favor, selecciona una fecha para el periodo.',
            confirmButtonText: 'Entendido'
          });
          return;
        }
        // Crear fecha con el formato deseado (agregar el primer día del mes)
        const fechaSeleccionada = new Date(`${fechaHasta}-01`);
        const fechaActual = new Date();  
           if (fechaSeleccionada < new Date(fechaActual.getFullYear(), fechaActual.getMonth()-1, 1)) {
              // Fecha válida
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Periodo no seleccionable',
                text: 'La fecha seleccionada no debe ser igual o superior al mes actual.',
              });
              return;
            }  

    // Mostrar el spinner
    this.isLoading = true; 
    this.rankingService.getRanking(this.searchTerm, codigoOficina,`${fecha_hasta}01`, ingenieria,cantidad,tipoRepuesto)
      .subscribe(
        data => {
        this.ranking = data;
        armaExcel(data);  
        this.isLoading = false;
      },error => {
        console.error('Error al obtener los datos', error);
        // Asegurarse de ocultar el spinner incluso en caso de error
        this.isLoading = false;
      });     
  }
}

interface Oficina {
  DESCRIPCION: string;
  CODIGO: string;
}
interface Ingenierias {
  DESCRIPCION: string;
  CODIGO: string;
}

function armaExcel(data: any) {

  let header = ['Lugar','Descripcion', 'Grupo','Codigo','Sufijo', 'Ingeniería']; 
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // Función para obtener los 12 meses anteriores a partir del mes ingresado
    const dateString = (document.getElementById('fechaHasta') as HTMLSelectElement).value;
    const date = new Date(dateString); // Convertimos el string a un objeto Date
    const startMonth = (date.getMonth()+1); // Obtenemos el mes (0-11)
    const startYear = date.getFullYear(); // Obtenemos el mes (0-11)
    let startYear_1 =  startYear -1
    let Hmeses = [];
    let result = [];  

    // Iterar de 11 a 0 para hacer el orden inverso directamente
    for (let i = 11; i >= 0; i--) {
        const currentIndex = (startMonth - i + 12) % 12; // Calcula el índice del mes anterior
        result.push(months[currentIndex]); // Agregar el mes al array  
        // Concatenar correctamente usando +=
        if( months[currentIndex] == 'Enero'){
          startYear_1 = startYear_1 + 1;
        }  
        Hmeses.push(startYear_1+ ' ' + months[currentIndex]);     
    }

     const final_header=  [ 'MesVenta', 'CostoMedio', 'Ult 12', 'Prom 12','Ult 6', 'Prom 6', 'Ult 3', 'Prom 3','Stock', 'NetoMeson', 'NetoMayorista',];


    for (let i = 11; i >= 0; i--) {
      const currentIndex = (startMonth - i + 12) % 12; // Calcula el índice del mes anterior
      result.push(months[currentIndex]); // Agregar el mes al array  
      // Concatenar correctamente usando +=
      if( months[currentIndex] == 'Enero'){
        startYear_1 = startYear_1 + 1;
      }  
     // Hmeses.push(startYear_1+ ' ' + months[currentIndex]);     
  }
  const array3 = header.concat(Hmeses.concat(final_header));

  let Oficina = '';



  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Ranking');
 
  // Obtener valores de los filtros
  const codigoOficina = (document.getElementById('selectOficinas') as HTMLSelectElement).value;
  const fecha_hasta = (document.getElementById('fechaHasta') as HTMLSelectElement).value;
  const fecha_sin_guiones = fecha_hasta.replace(/-/g, '');
  const ingenieria = (document.getElementById('selectIngenierias') as HTMLSelectElement).value;
  const cantidad = (document.getElementById('cantidadRepuestos') as HTMLSelectElement).value;
  const tipoRepuesto = (document.getElementById('tipoRepuesto') as HTMLSelectElement).value;


  let txt_ing = '';

  const selectElement = document.getElementById('selectIngenierias') as HTMLSelectElement;
  if (selectElement) {
    const selectedTextING = selectElement.options[selectElement.selectedIndex].text;
    console.log(selectedTextING);  // Muestra el texto de la opción seleccionada
    txt_ing = selectedTextING;
  } else {
    console.error('Elemento no encontrado');
  }


  if(codigoOficina == '126'){
    Oficina = 'Valparaiso Chacabuco';
  }
  if(codigoOficina == '127'){
    Oficina = 'Viña del Mar 15 Norte';
  }
  if(codigoOficina == '130'){
    Oficina = 'Kovacs Reptos Ltda';
  }



  let tipoR = '';
  if(tipoRepuesto == '0'){
    tipoR = 'TODOS'
  }
  if(tipoRepuesto == '1'){
    tipoR = 'ORIGINALES'
  }
  if(tipoRepuesto == '2'){
    tipoR = 'ALTENATIVOS'
  }
  

  // Añadir título
  worksheet.addRow(['','Ranking de venta de repuestos al', fecha_hasta , '', 'Oficina', Oficina] );
  // Añadir una fila con los filtros aplicados
  worksheet.addRow(['','Filtros aplicados:']);
  worksheet.addRow(['',`Ingeniería: ${txt_ing}`, `Cantidad: ${cantidad}`, `Tipo de repuesto: ${tipoR}`]);

  worksheet.getColumn(1).width = 5;
  worksheet.getColumn(2).width = 50;
  worksheet.getColumn(3).width = 10;
  worksheet.getColumn(6).width = 15;
  // Establecer encabezados en la fila 4
  worksheet.getRow(4).values = array3;
  // Aplicar estilos (fondo negro y letras blancas) a las celdas de la fila 4
worksheet.getRow(4).eachCell((cell) => {
  cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF000000' }  // Fondo negro
  };
  cell.font = {
      color: { argb: 'FFFFFFFF' },   // Letras blancas
      bold: true                     // Opción para negrita (opcional)
  };
});

  $.each(data, function (i, value) {	
    worksheet.addRow([  
      Number(this.ID)  ,
      this.Descripcion  ,  
      Number(this.Grupo),
      this.codigo, 
      this.Sufijo,   
      this.Ingenieria, 

      // Number(this.mes1 ?? 0), 
      // Number(this.mes2 ?? 0), 
      // Number(this.mes3 ?? 0), 
      // Number(this.mes4 ?? 0), 
      // Number(this.mes5 ?? 0), 
      // Number(this.mes6 ?? 0), 
      // Number(this.mes7 ?? 0), 
      // Number(this.mes8 ?? 0), 
      // Number(this.mes9 ?? 0), 
      // Number(this.mes10 ?? 0), 
      // Number(this.mes11 ?? 0), 
      // Number(this.mes12 ?? 0), 

      Number(this.mes12 ?? 0),
      Number(this.mes11 ?? 0), 
      Number(this.mes10 ?? 0), 
      Number(this.mes9 ?? 0), 
      Number(this.mes8 ?? 0), 
      Number(this.mes7 ?? 0), 
      Number(this.mes6 ?? 0), 
      Number(this.mes5 ?? 0), 
      Number(this.mes4 ?? 0), 
      Number(this.mes3 ?? 0), 
      Number(this.mes2 ?? 0), 
      Number(this.mes1 ?? 0),      
    
      Number(this.MesVenta ?? 0),
      Number(this.CostoMedio),    
      Number(this.veNta12meses  ?? 0), 
      Number(this.prom12 ?? 0),        
      Number(this.M6 ?? 0),        
      Number(this.prom6 ?? 0),        
      Number(this.M3 ?? 0),        
      Number(this.prom3 ?? 0),

      Number(this.STOCK), 
      Number(this.NetoMeson),  
      Number(this.NetoMayorista) 

    ]);	
  });
  // Generar el archivo Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Ranking.xlsx');
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
      option.text = item.DESCRIPCION;
      option.value = item.CODIGO;
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
function llena_tipo_repuestos(data: any) {
  const selectElement = document.getElementById('tipoRepuesto');
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
  var cuerpoTabla = '';
  let mesesTabla = '';
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];  
  // Función para obtener los 12 meses anteriores a partir del mes ingresado
  const dateString = (document.getElementById('fechaHasta') as HTMLSelectElement).value;

  const date = new Date(dateString); // Convertimos el string a un objeto Date
  const startMonth = (date.getMonth()+1); // Obtenemos el mes (0-11)
  const startYear = date.getFullYear(); // Obtenemos el mes (0-11)
  let startYear_1 =  startYear -1
  let result = [];  
  // Iterar de 11 a 0 para hacer el orden inverso directamente
  for (let i = 11; i >= 0; i--) {
      const currentIndex = (startMonth - i + 12) % 12; // Calcula el índice del mes anterior
      result.push(months[currentIndex]); // Agregar el mes al array  
      // Concatenar correctamente usando +=
      if( months[currentIndex] == 'Enero'){
        startYear_1 = startYear_1 + 1;
      }
      mesesTabla += '<th>' +startYear_1+ ' ' + months[currentIndex] + '</th>'; 
  }  
  console.log(mesesTabla);
  var list = 0;
  //console.log(data);


  const date2 = new Date();
const day = String(date2.getDate()).padStart(2, '0');
const month = String(date2.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
const year = date2.getFullYear();

const formattedDate = `${day}-${month}-${year}`;
console.log(formattedDate); // Ejemplo: 21-10-2024




  $.each(data, function (i, value) {	
        cuerpoTabla += '<tr>'
        cuerpoTabla += '<td>'+this.ID+'</td>'  
        cuerpoTabla += '<td>'+this.Descripcion+'</td>'        
        cuerpoTabla += '<td>'+this.Grupo+'</td>' 
        cuerpoTabla += '<td>'+this.codigo+'</td>' 
        cuerpoTabla += '<td>'+this.Sufijo+'</td>'   
        cuerpoTabla += '<td>'+this.Ingenieria+'</td>' 


        // cuerpoTabla += '<td>'+(this.mes1 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes2 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes3 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes4 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes5 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes6 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes7 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes8 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes9 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes10 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes11 ?? 0)+'</td>' 
        // cuerpoTabla += '<td>'+(this.mes12 ?? 0)+'</td>' 


        cuerpoTabla += '<td>'+(this.mes12 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes11 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes10 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes9 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes8 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes7 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes6 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes5 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes4 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes3 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes2 ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.mes1 ?? 0)+'</td>' 



        cuerpoTabla += '<td>'+(this.MesVenta ?? 0)+'</td>'  
        cuerpoTabla += '<td>'+(this.veNta12meses  ?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.prom12 ?? 0)+'</td>'        
        cuerpoTabla += '<td>'+(this.M6 ?? 0)+'</td>'        
        cuerpoTabla += '<td>'+(this.prom6 ?? 0)+'</td>'        
        cuerpoTabla += '<td>'+(this.M3 ?? 0)+'</td>'        
        cuerpoTabla += '<td>'+(this.prom3 ?? 0)+'</td>' 


        cuerpoTabla += '<td>'+(this.STOCK?? 0)+'</td>' 
        cuerpoTabla += '<td>'+(this.NetoMeson?? 0)+'</td>'  
        cuerpoTabla += '<td>'+(this.NetoMayorista?? 0)+'</td>' 

        cuerpoTabla += '</tr>'


        list++;			
  });




  if ($.fn.DataTable.isDataTable('#DTable')) {
    $('#DTable').DataTable().destroy();  // Destruir la instancia existente si ya está inicializada
  }
  	//console.log(data);	
		$("#DTable").html('');	
		$("#DTable").html('<table class="table w-100 table-sm table-striped table-bordered table-hover " id="DTable" style="font-size:8px;">'	
    +'<thead style=" background-color: black; color: white;">'            
    +'<tr>'
    +'<th>Lugar</th>' 
    +'<th>Descripcion</th>'     
    +'<th>Grupo</th>'
    +'<th>Codigo</th>'
    +'<th>Sufijo</th>'  
    +'<th>Ingenieria</th>'   

    + mesesTabla

    +'<th>Mes Venta</th>'
    +'<th>Ult 12 M</th>'
    +'<th>Prom 12 M</th>'
    +'<th>Ult 6 M</th>'
    +'<th>Prom 6 M</th>'
    +'<th>Ult 3 M</th>'
    +'<th>Prom 3 M</th>'

    +'<th>Stock al :'+formattedDate+'</th>'
    +'<th>Neto Meson</th>'
    +'<th>Neto Mayorista</th>'

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

 