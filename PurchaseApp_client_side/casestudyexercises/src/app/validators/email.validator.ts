import { AbstractControl } from '@angular/forms';
export function ValidateEmail
(control: AbstractControl): { invalidEmail: boolean } | null 
{
  const EMAIL_REGEXP = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return !EMAIL_REGEXP.test(control.value) ? { invalidEmail: true } : null;
} // ValidateEmail