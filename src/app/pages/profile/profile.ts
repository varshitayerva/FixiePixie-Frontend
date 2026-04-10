import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  user: any = null; // Will hold the API response
  userId: string | null = null;
  
  // These could also come from an API later
  stats = [
    { label: 'Completed Bookings', value: '18' },
    { label: 'Upcoming Services', value: '2' },
    { label: 'Saved Addresses', value: '3' },
  ];

 ngOnInit(): void {
    // Only run this if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        this.getUserProfile();
      }
    }
  }

  getUserProfile() {
    this.http.get<any>(`http://localhost:8081/api/users/${this.userId}`)
      .subscribe({
        next: (res) => {
          this.user = res.data; // Remember to use .data from your ApiResponse
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error fetching profile:', err)
      });
  }

  // Helper to get initials for the avatar (e.g., "Jane Doe" -> "JD")
  getInitials(name: string): string {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}