import { AuthService } from './auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { User } from '@angular-slack/slack-api';

import { pipe, switchMap, tap } from 'rxjs';

export type AuthState = {
  user: User;
};

export const initialUserValue: User = {
  email: '',
  token: '',
  username: '',
  bio: '',
  image: '',
};

const authInitialState: AuthState = {
  user: initialUserValue,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods((store, authService = inject(AuthService)) => ({
    getUser: rxMethod<void>(
      pipe(
        switchMap(() => authService.getMe()),
        tap((user) => patchState(store, { user }))
      )
    ),
  }))
);
