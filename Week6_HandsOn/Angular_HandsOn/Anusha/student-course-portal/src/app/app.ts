import {
  Component
} from '@angular/core';

import {
  AsyncPipe
} from '@angular/common';

import {
  RouterOutlet
} from '@angular/router';

import {
  Header
} from './components/header/header';

import {
  LoadingService
} from './services/loading';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  readonly isLoading$;

  constructor(
    loadingService: LoadingService
  ) {
    this.isLoading$ =
      loadingService.isLoading$;
  }
}
