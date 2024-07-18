import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.email }}</li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
