import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';   
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';            
import { Role } from '../../core/role';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,     
    MatButtonModule,    
    RouterModule      
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] 
})
export class Login {
  constructor(private role: Role, private router: Router, private cookieService: CookieService) {}
  

loginAsCustomer() {
  
  // localStorage.setItem('role', 'CUSTOMER');
  this.cookieService.set('role', 'CUSTOMER', 1, '/');
  this.router.navigate(['/customer-dashboard']);
}

loginAsProvider() {
  // localStorage.setItem('role', 'PROVIDER');
  this.cookieService.set('role', 'PROVIDER', 1, '/');
  this.router.navigate(['/provider-dashboard']);
}
}