import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';

// UPDATED: Matches your new Backend Response
export interface BookingResponseDTO {
  id: number;
  userId: number;
  serviceId: number;
  date: string;
  status: string;
  timeSlot: string;
  serviceName: string;      // From Provider Service
  customerName: string;     // From User Service
  customerNumber: string;   // From User Service
  customerAddress: string;  // From User Service
}

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterModule, CommonModule, Navbar],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistory implements OnInit {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  // UPDATED: Points to your new Provider View endpoint
  private readonly BOOKING_API = 'http://localhost:8081/bookings/provider-view';

  // UPDATED: Columns to show Customer info and Service Name
  displayedColumns: string[] = ['customerName', 'serviceName', 'date', 'status', 'action'];
  bookings: BookingResponseDTO[] = [];
  loading = false;
  error: string | null = null;

  private providerId: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // In your case, the logged-in Admin's ID is the providerId
      this.providerId = localStorage.getItem('userId'); 
      if (this.providerId) {
        this.fetchProviderBookings();
      } else {
        this.error = 'Provider not logged in.';
      }
    }
  }

  fetchProviderBookings(): void {
    this.loading = true;
    this.http.get<BookingResponseDTO[]>(`${this.BOOKING_API}/${this.providerId}`)
      .subscribe({
        next: (data) => {
          this.bookings = data || [];
          console.log("Provider Dashboard Data:", data);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Fetch failed:', err);
          this.loading = false;
          this.error = "Could not load bookings.";
          this.cdr.detectChanges();
        }
      });
  }

  // Same logic, but updated to call the specific ID
  cancelBooking(id: number): void {
    if (!confirm('Are you sure you want to cancel this customer booking?')) return;

    // Assuming DELETE /api/bookings/{id} still exists
    this.http.delete(`http://localhost:8081/bookings/${id}`, { responseType: 'text' })
      .subscribe({
        next: () => this.fetchProviderBookings(),
        error: (err) => console.error('Cancel failed:', err)
      });
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      CONFIRMED: 'confirmed',
      PENDING_PAYMENT: 'pending-payment',
      CANCELLED: 'cancelled',
    };
    return map[status?.toUpperCase()] ?? 'pending';
  }

  statusLabel(status: string): string {
    return status?.replace('_', ' ') || status;
  }
}