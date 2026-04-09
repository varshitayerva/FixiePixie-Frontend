import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [Navbar],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {

  booking: any;

  ngOnInit() {

    // ✅ Try history state first
    this.booking = history.state;

    // ❗ If refresh → fallback to localStorage
    if (!this.booking || !this.booking.service) {
      const stored = localStorage.getItem('selectedService');
      
      if (stored) {
        const service = JSON.parse(stored);

        this.booking = {
          service: service.serviceName,
          price: service.price,
          date: 'Today',
          slot: '10:00 AM'
        };
      }
    }

    console.log("BOOKING:", this.booking);
  }

  pay() {

    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    bookings.push({
      ...this.booking,
      status: 'CONFIRMED'
    });

    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Payment Successful ✅');
  }
}