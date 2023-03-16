import { createAction, props } from "@ngrx/store";

export const loginRequest=createAction(
  '[Auth] login Request',
  props<{credentials:{email:any; password:any}}>()

);

export const loginSuccess=createAction(
  '[Auth] login Success',
  props<{ user: any, token: string }>()

);
export const loginFailure=createAction(
  '[Auth] login Failure',
  props<{error:string}>()

);
