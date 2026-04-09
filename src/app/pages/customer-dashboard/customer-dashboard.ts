// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { Navbar } from '../../navbar/navbar';
// import { RouterModule } from '@angular/router';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-dashboard',
//   standalone:true,
//   imports: [MatCardModule,MatButtonModule,RouterModule],
//   templateUrl: './customer-dashboard.html',
//   styleUrl: './customer-dashboard.css',
// })
// export class Dashboard {
//   constructor(private router: Router) {}

//   selectService(service: string, price: number) {
//     this.router.navigate(['/booking'], {
//       state: {
//         service,
//         price,
//         description: 'Professional home service'
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class Dashboard implements OnInit {

  services: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.http.get<any[]>('http://localhost:8083/api/services')
      .subscribe({
        next: (res) => {
          console.log("SERVICES:", res);
          this.services = res;
        },
        error: (err) => {
          console.error("ERROR:", err);
        }
      });
  }

selectService(service: any) {
  localStorage.setItem('selectedService', JSON.stringify(service));
}

  getIcon(category: string): string {
    switch(category) {
      case 'ELECTRICAL': return 'electrical_services';
      case 'CLEANING': return 'cleaning_services';
      case 'HOME_SERVICE': return 'home';
      default: return 'build';
    }
  }
}
