import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { getMongoConfig } from '../config/db-connect.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Позволяет обратиться к env во всем приложении
      envFilePath: 'envs/.backend.env', // Указываем путь до env файла
    }),
    MongooseModule.forRootAsync({
      // Модуль для работы с mongo
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig, // добавляем созданную ранее функцию подключения к БД
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
