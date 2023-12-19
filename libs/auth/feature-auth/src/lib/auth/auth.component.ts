import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TuiLabelModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

import { AuthService } from '@angular-slack/auth/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'as-auth',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiLabelModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  authService = inject(AuthService);
  router = inject(Router);

  readonly loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
  });

  login() {
    if (!this.loginForm.value.userName) {
      return;
    }

    this.authService.login({
      userName: this.loginForm.value.userName,
    });

    this.router.navigate(['/client/companyId']);
  }
}
