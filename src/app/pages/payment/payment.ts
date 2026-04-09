import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-payment',
  imports: [Navbar],
  standalone:true,
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
   booking: any;

  ngOnInit() {
    this.booking = history.state;
  }

  pay() {

    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    // update latest booking to CONFIRMED
    bookings[bookings.length - 1].status = 'CONFIRMED';

    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Payment Successful ✅');
  }
}
