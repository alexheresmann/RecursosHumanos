import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

constructor() { }


ngOnInit(): void {
  //alert('probando');
  this.loadScript('assets/dist/js/pages/dashboard2.js'); 
    
  //this.loadScript('assets/dist/js/demo.js');

}


loadScript(src: string): void {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  script.async = true;
  script.onload = () => {
    console.log('Script loaded successfully.');
  };
  script.onerror = () => {
    console.error('Error loading script.');
  };
  document.body.appendChild(script);
}

}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule,RouterModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })

// export class DashboardComponent {

//   ngOnInit(): void {
//   alert('probando');
//   this.loadScript('assets/dist/js/pages/dashboard2.js');    
// }

// loadScript(src: string): void {
//   const script = document.createElement('script');
//   script.src = src;
//   script.type = 'text/javascript';
//   script.async = true;
//   script.onload = () => {
//     console.log('Script loaded successfully.');
//   };
//   script.onerror = () => {
//     console.error('Error loading script.');
//   };
//   document.body.appendChild(script);
// }

// }