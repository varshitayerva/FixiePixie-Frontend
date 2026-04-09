import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-service',
  imports: [FormsModule,Navbar],
  standalone:true,
  templateUrl: './add-service.html',
  styleUrl: './add-service.css',
})
export class AddService {
  serviceName: string = '';
  price: number = 0;
  description: string = '';

  constructor(private router: Router) {}

  addService() {

    if (!this.serviceName || !this.price || !this.description) {
      alert('Please fill all fields');
      return;
    }

    const newService = {
      name: this.serviceName,
      price: this.price,
      description: this.description
    };

    let services = JSON.parse(localStorage.getItem('services') || '[]');

    services.push(newService);

    localStorage.setItem('services', JSON.stringify(services));

    alert('Service Added Successfully ✅');

    this.router.navigate(['/provider-dashboard']);
}
}
