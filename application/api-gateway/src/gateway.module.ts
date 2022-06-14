import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResourceController } from './api-controllers/resource.controller';
import { UserResourceController } from './api-controllers/user-resource.controller';
import { AuthController } from './api-controllers/auth.controller';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URI],
          queue: 'resource_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'USER_RESOURCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URI],
          queue: 'user_resource_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URI],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    AuthorizationModule,
  ],
  controllers: [ResourceController, UserResourceController, AuthController],
  providers: [],
})
export class GatewayModule {}
