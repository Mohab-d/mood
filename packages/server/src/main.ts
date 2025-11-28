import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MoodConfig } from '@mood/core';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Mood',
      logLevels: MoodConfig.getInstance().getProperty('logLevels'),
    }),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
