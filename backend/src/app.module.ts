import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe o ConfigService
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1. Carrega as variáveis do .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Conecta no Mongo de forma Assíncrona (espera o .env carregar)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }