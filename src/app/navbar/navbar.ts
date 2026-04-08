import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  role: string | null = null;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    
  }

  ngDoCheck() {
    // Retrieve the cookie
    this.role = this.cookieService.get('role');
  }

  logout() {
    this.cookieService.delete('role', '/'); // Delete the specific cookie
    this.role = null;
    this.router.navigate(['/']);
  }
}