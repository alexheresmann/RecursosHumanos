import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent  } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import path from 'path';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MayoristasComponent } from './pages/mayoristas/mayoristas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataTablesModule } from 'angular-datatables';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { VentasRepuestosComponent } from './pages/ventas-repuestos/ventas-repuestos.component';
import { RankingRepuestosComponent } from './pages/ranking-repuestos/ranking-repuestos.component';
import { AdministrarEscalasComponent } from './pages/administrar-escalas/administrar-escalas.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
import { EmisionComisionesComponent } from './pages/emision-comisiones/emision-comisiones.component';



const routes : Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'usuarios', component:UsuariosComponent},
  {path:'clientes', component:ClientesComponent},
  {path:'mayoristas', component:MayoristasComponent}, 
  {path:'VentasRepuestos', component:VentasRepuestosComponent}, 
  {path:'RankingRepuestos', component:RankingRepuestosComponent}, 


  {path:'AdministrarEscalas', component:AdministrarEscalasComponent}, 
  {path:'AdministrarUsuarios', component:AdministrarUsuariosComponent}, 
  {path:'EmisionComisiones', component:EmisionComisionesComponent}, 

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
   // SharedModule,
    // ClientesComponent,
    MayoristasComponent,
     UsuariosComponent,
     DashboardComponent,
     RankingRepuestosComponent,
     VentasRepuestosComponent,
     AdministrarEscalasComponent,
     AdministrarUsuariosComponent,
     EmisionComisionesComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    DataTablesModule

    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
