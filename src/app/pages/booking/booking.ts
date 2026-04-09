import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule,Navbar],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingPage {

  service: any;
  date: string = '';
  slot: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.service = history.state;
  }

  bookService() {

    const bookingData = {
      service: this.service.service,
      price: this.service.price,
      description: this.service.description,
      date: this.date,
      slot: this.slot,
      status: 'PENDING'
    };

    // GET existing bookings
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    // ADD new booking
    bookings.push(bookingData);

    // SAVE back
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // NAVIGATE to payment
    this.router.navigate(['/payment'], {
      state: bookingData
    });
  }
}