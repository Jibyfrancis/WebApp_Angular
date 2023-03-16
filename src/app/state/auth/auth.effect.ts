import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/service/auth.service';
import { loginRequest, loginSuccess, loginFailure } from './auth.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  login$ = createEffect(() =>

    this.actions$.pipe(
      ofType(loginRequest),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(res => {

            if (res && res['status'] === 'ok' && res['data']['response'] && res['data']['authToken']) {
              localStorage.setItem('token', res['data']['authToken'])
              return loginSuccess({ user: res['data']['response'], token: res['data']['authToken'] });
            }
            else
              return loginFailure({ error: res['data'] })
          }),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['/dashboard']);
      })
    ), { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailure),
      tap(() => {
        this.router.navigate(['/login']);
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }
}

