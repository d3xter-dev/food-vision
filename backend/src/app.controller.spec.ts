import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ImageService } from './services/image/image.service';
import { OpenaiService } from './services/openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import { AnalysisResult } from './services/openai/openai.service';
import { CacheModule } from '@nestjs/cache-manager';
import { getSampleImage } from '../test/utils';

describe('AppController', () => {
  let appController: AppController;
  let mockFile: Express.Multer.File;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ImageService, OpenaiService],
      imports: [CacheModule.register(), ConfigModule.forRoot()],
    }).compile();

    appController = app.get<AppController>(AppController);
    mockFile = {
      buffer: Buffer.from(getSampleImage('small-food-image.webp'), 'base64'),
    } as Express.Multer.File;
  });

  it('should return cached result if available', async () => {
    const mockResult: AnalysisResult = {
      items: [{ id: crypto.randomUUID(), name: 'test', cal: 1, fat: 2, carbs: 3, protein: 4, weight: 100 }],
    };

    jest.spyOn(appController['cacheManager'], 'get').mockResolvedValue(mockResult);
    const result = await appController.analyze(mockFile);
    expect(result).toEqual(mockResult);
  });

  it('should analyze and cache the result if not cached', async () => {
    const mockResult: AnalysisResult = {
      items: [{ id: crypto.randomUUID(), name: 'test', cal: 1, fat: 2, carbs: 3, protein: 4, weight: 100 }],
    };

    jest.spyOn(appController['cacheManager'], 'get').mockResolvedValue(undefined);
    jest.spyOn(appController['openaiService'], 'analyzeImage').mockResolvedValue(mockResult);
    jest.spyOn(appController['cacheManager'], 'set').mockResolvedValue(undefined);

    const result = await appController.analyze(mockFile);
    expect(result).toEqual(mockResult);
    expect(appController['cacheManager'].set).toHaveBeenCalledWith(expect.any(String), mockResult, 0);
  });
});
