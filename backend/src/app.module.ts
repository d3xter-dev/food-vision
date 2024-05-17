import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from './services/image/image.service';
import { OpenaiService } from './services/openai/openai.service';
import authConfig from './config/auth.config';
import openaiConfig from './config/openai.config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, openaiConfig],
    }),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [ImageService, OpenaiService],
})
export class AppModule {}
