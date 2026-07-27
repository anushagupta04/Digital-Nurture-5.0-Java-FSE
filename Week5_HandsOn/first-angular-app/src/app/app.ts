import { Component } from '@angular/core';
import { Employee } from './employee/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Employee],
  template: `<app-employee></app-employee>`,
  styleUrl: './app.css'
})
export class App {
}
