import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getMessage(): string {
    return 'Welcome to Angular Service';
  }
}
