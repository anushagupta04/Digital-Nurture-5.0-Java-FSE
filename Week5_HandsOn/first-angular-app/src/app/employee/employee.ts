import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee {
  message: string;

  constructor(private service: EmployeeService) {
    this.message = this.service.getMessage();
  }
}
