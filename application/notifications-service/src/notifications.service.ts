import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  handleNotification(userResource: Object): void {
    console.log('New User Resource has been created:');
    console.log(userResource);
    console.log(
      'The Notifications Service could do something with this information...',
    );
  }
}
