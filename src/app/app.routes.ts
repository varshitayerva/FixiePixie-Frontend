import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/customer-dashboard/customer-dashboard';
import { BookService } from './pages/book-service/book-service';
import { BookingHistory } from './pages/booking-history/booking-history';
import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { Payment } from './pages/payment/payment';
import { BookingPage } from './pages/booking/booking';
import { AddService } from './pages/add-service/add-service';

export const routes: Routes = [
    {path:'', component:Login},
    {path:'register', component:Register},

    //Customer Flow
    {path:'customer-dashboard',component: Dashboard},
    {path:'bookservice',component:BookService},
    {path:'bookhistory',component:BookingHistory},

    //Provider Flow
    {path:'provider-dashboard',component:ProviderDashboard},
    {path:'add-service',component:AddService},

    
    //Payment Flow
    {path: 'booking', component:BookingPage},
    { path: 'payment', component: Payment },

    //fallback
    {path:'**',redirectTo: ''},

];
