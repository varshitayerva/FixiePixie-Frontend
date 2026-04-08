import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Role {
  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isCustomer() {
    return this.getRole() === 'CUSTOMER';
  }

  isProvider() {
    return this.getRole() === 'PROVIDER';
  }
}
