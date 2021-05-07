import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const logger = new Logger('bootstrap');

    const app = await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe());

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }

    const serverConfig = config.get('server');

    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);

    logger.log(`Application listing on port ${port}`);
}
bootstrap();
