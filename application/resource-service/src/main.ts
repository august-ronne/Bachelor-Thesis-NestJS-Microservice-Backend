import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ResourceModule } from './resource.module';

async function bootstrap() {
  const app = await NestFactory.create(ResourceModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('AMQP_URI')],
      queue: 'resource_queue',
      queueOptions: { durable: false },
    },
  });
  app.startAllMicroservices();
}
bootstrap();
