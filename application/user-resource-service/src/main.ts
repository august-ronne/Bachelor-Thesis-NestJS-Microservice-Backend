import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserResourceModule } from './user-resource.module';

async function bootstrap() {
  const app = await NestFactory.create(UserResourceModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('AMQP_URI')],
      queue: 'user_resource_queue',
      queueOptions: { durable: false },
    },
  });
  app.startAllMicroservices();
}
bootstrap();
