import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('new-user-resource-created')
  async handleNewUserResourceCreated(userResource: Object): Promise<void> {
    console.log(userResource);
    this.notificationsService.handleNotification(userResource);
  }
}
