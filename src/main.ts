import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3009,
      },
    },
  );

  await app
    .listen()
    .then((value) =>
      console.log('Tasks Microservice is running on TCP transport-->', value),
    );
  console.log('Tasks Microservice is running on TCP transport');
}
bootstrap();
