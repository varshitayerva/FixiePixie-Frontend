import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [FormsModule, Navbar, HttpClientModule],
  templateUrl: './add-service.html',
  styleUrl: './add-service.css',
})
export class AddService {

  serviceName: string = '';
  price: number = 0;
  description: string = '';
  category: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  addService() {

    if (!this.serviceName || !this.price || !this.description || !this.category) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      serviceName: this.serviceName,   
      price: this.price,
      description: this.description,
      category: this.category
    };

    this.http.post('http://localhost:8083/api/services', payload)
      .subscribe({
        next: (res) => {
          console.log("SERVICE ADDED", res);
          alert('Service Added Successfully ✅');

          this.router.navigate(['/provider-dashboard']);
        },
        error: (err) => {
          console.error("ERROR", err);

          if (err.error?.message) {
            alert(err.error.message);
          } else {
            alert("Failed to add service");
          }
        }
      });
  }
}