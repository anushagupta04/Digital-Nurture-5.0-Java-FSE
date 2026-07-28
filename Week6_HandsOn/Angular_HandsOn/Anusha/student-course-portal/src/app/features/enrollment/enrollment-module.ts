import { NgModule } from '@angular/core';


import {
  EnrollmentForm
} from '../../pages/enrollment-form/enrollment-form';

import {
  ReactiveEnrollmentForm
} from '../../pages/reactive-enrollment-form/reactive-enrollment-form';

import {
  EnrollmentRoutingModule
} from './enrollment-routing-module';

@NgModule({
  imports: [
    EnrollmentRoutingModule,

    /*
     * These are standalone Angular 20 components,
     * so they belong in imports, not declarations.
     */
    EnrollmentForm,
    ReactiveEnrollmentForm
  ]
})
export class EnrollmentModule {

}
