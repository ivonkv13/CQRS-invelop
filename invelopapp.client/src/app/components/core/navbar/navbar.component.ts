import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: 'contacts',
      replaceUrl: true,
      disabled: true
    },
    {
      label: 'Contacts',
      icon: 'pi pi-envelope',
      routerLink: 'contacts',
      replaceUrl: true
    },
  ];
}
