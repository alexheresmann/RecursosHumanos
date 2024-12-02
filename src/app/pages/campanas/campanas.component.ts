import { Component } from '@angular/core';
import { CampanasService} from '../../campanas.service';
import { ModelosService } from '../../modelos.service';
import { OficinasService } from '../../oficinas.service';

@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrl: './campanas.component.css'
})
export class CampanasComponent {

  searchTerm: string = '';
  campanas: any[] = [];
  oficinas: any[] = [];
  modelos: any[] = [];

  //dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private campanasService: CampanasService,
    private modelosService: ModelosService,
    private oficinasService : OficinasService
  ) {}

  ngOnInit(): void {
      // Cargar datos de campañas
      this.campanasService.getCampanas(this.searchTerm).subscribe(data => {
        this.campanas = data;
       // console.log(data);
        // carga_tabla_BD(data); // Si necesitas inicializar la DataTable
      });

      // Cargar datos de modelos
      this.modelosService.getModelos(this.searchTerm).subscribe(data2 => {
        this.modelos = data2;
        llena_modelos(data2);
        console.log(data2);
      });

      this.oficinasService.getOficinas(this.searchTerm).subscribe(data3 => {
        this.oficinas = data3;
        llena_oficinas(data3);
       // console.log(data3);
      }); 
  }

  
  // onSearch(): void {
  //   this.CampanasService.getCampanas(this.searchTerm).subscribe(data => {
  //     this.campanas = data;
  //    // carga_tabla_BD(data);     
  //   });
  // }


}

interface Oficina {
  DescripcionOficina: string;
  CodigoOficina: string;
}

interface Modelo {
  B_NGM902: string;
  B_MOD902: string;
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
      option.text = item.DescripcionOficina;
      option.value = item.CodigoOficina;
      selectElement.appendChild(option);
  });
}

function llena_modelos(data2: any) {
  const selectElement = document.getElementById('modeloSelect');
  if (!selectElement) {
     // console.error('El elemento "selectOficinas" no se encontró.');
      return;
  }
  selectElement.innerHTML = ''; // Limpiar cualquier opción existente
  data2.forEach((item: Modelo)  => {
      const option = document.createElement('option');
      option.text = item.B_NGM902;
      option.value = item.B_MOD902;
      selectElement.appendChild(option);
  });
}


