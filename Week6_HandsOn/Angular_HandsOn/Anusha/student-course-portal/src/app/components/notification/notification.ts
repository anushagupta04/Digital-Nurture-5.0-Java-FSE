import { Component } from '@angular/core';
import {
  NotificationService
} from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',

  /*
   * Providing NotificationService here creates a new service
   * instance scoped only to this component and its children.
   * It is not shared with the entire application.
   */
  providers: [
    NotificationService
  ]
})
export class Notification {

  constructor(
    private notificationService:
    NotificationService
  ) {
  }

  get message(): string {
    return this.notificationService.getMessage();
  }

  changeMessage(): void {
    this.notificationService.setMessage(
      'Your profile notification has been updated.'
    );
  }
}
