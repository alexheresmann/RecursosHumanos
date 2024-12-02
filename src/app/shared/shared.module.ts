import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//  import { HeaderComponent } from './header/header.component';
//  import { SidebarComponent } from './sidebar/sidebar.component';
//  import { FooterComponent } from './footer/footer.component';


import { HeaderComponent  } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    //  HeaderComponent,
    //  SidebarComponent,
    //  FooterComponent ,
  ],

  exports :[
    //  HeaderComponent,
    //  SidebarComponent,
    //  FooterComponent ,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
