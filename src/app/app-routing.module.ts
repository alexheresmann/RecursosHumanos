import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CampanasComponent } from './pages/campanas/campanas.component';

import { MayoristasComponent } from './pages/mayoristas/mayoristas.component';
import { VentasRepuestosComponent } from './pages/ventas-repuestos/ventas-repuestos.component';
import { RankingRepuestosComponent } from './pages/ranking-repuestos/ranking-repuestos.component';


import { AdministrarEscalasComponent } from './pages/administrar-escalas/administrar-escalas.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
import { EmisionComisionesComponent } from './pages/emision-comisiones/emision-comisiones.component';


const routes: Routes = [ 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'campanas', component: CampanasComponent },
  { path: 'mayoristas', component: MayoristasComponent },
  { path: 'ventasRepuestos', component: VentasRepuestosComponent },
  { path: 'RankingRepuestos', component: RankingRepuestosComponent },

  { path: 'RankingRepuestos', component: RankingRepuestosComponent },
  { path: 'RankingRepuestos', component: RankingRepuestosComponent },
  { path: 'RankingRepuestos', component: RankingRepuestosComponent },


  {path:'AdministrarEscalas', component:AdministrarEscalasComponent}, 
  {path:'AdministrarUsuarios', component:AdministrarUsuariosComponent}, 
  {path:'EmisionComisiones', component:EmisionComisionesComponent}, 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
