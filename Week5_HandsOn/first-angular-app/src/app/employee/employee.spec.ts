import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getMessage() {
    return "Welcome to Angular Service";
  }

}
