import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 1. Import
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [Navbar, CommonModule], // 2. Add HttpClientModule
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class PaymentPage implements OnInit {
  private snackBar = inject(MatSnackBar);
  bookingDetails: any;
  isProcessing: boolean = false; // To prevent multiple calls during hover

  constructor(
    private router: Router,
    private http: HttpClient, // 3. Inject HttpClient
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.bookingDetails = history.state;
      console.log('Received Booking Details:', this.bookingDetails);
    }
  }

  onPaymentHover() {
    // Prevent multiple requests if the user hovers back and forth
    if (this.isProcessing) return;
    this.isProcessing = true;

    // 4. Prepare the PaymentDTO based on your Backend class
    const paymentData = {
      bookingId: this.bookingDetails.bookingId, // Passed from BookingPage
      amount: this.bookingDetails.price,
      paymentMethod: 'UPI' // Default for QR code
    };

    console.log('Processing Payment Request:', paymentData);

    // 5. Send POST request to your PaymentMicroservice
    this.http.post('http://localhost:8081/process', paymentData)
      .subscribe({
        next: (res) => {
          console.log('Payment stored successfully:', res);
          
          // Wait for visual effect before redirecting
          setTimeout(() => {
            this.snackBar.open("Payment Successful! ✅ Booking Confirmed.", 'Close', {duration: 3000});
            this.router.navigate(['/customer-dashboard']);
          }, 1500);
        },
        error: (err) => {
          this.isProcessing = false;
          console.error('Payment Error:', err);
          this.snackBar.open("Payment Failed. Please try again.", 'Close', {duration: 3000});
        }
      });
  }
}