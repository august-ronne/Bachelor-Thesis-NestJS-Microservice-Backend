import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
