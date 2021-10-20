import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env'}),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

