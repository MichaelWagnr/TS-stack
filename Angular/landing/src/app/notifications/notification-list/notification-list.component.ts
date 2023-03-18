import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Command, NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent {
  messages: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages = notificationsService.messagesOutput;

    // setInterval(() => {
    //   this.notificationsService.addSuccess('It is errorly working!');
    // }, 2000);
  }

  clearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }
}
