import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { getSampleImage } from '../../../test/utils';

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiService],
      imports: [
        ConfigModule.forFeature(async () => ({
          'openai.key': process.env.OPENAI_KEY,
        })),
      ],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a error if no image is provided', async () => {
    await expect(service.analyzeImage('')).rejects.toThrow();
  });

  it('should return a error if no image valid is provided', async () => {
    await expect(service.analyzeImage('a')).rejects.toThrow();
  });

  it('should return a response in correct format even image contains no food', async () => {
    const base64Image = getSampleImage('no-food-image.png');
    const response = await service.analyzeImage('data:image/*;base64,' + base64Image);

    expect({ items: [] }).toEqual(response);
  });

  it('should detect all food items and collect nutrition facts', async () => {
    const base64Image = getSampleImage('small-food-image.webp');
    const response = await service.analyzeImage('data:image/*;base64,' + base64Image);

    expect(response).toEqual(expect.any(Object));
    expect(response.items).toEqual(expect.any(Array));
    expect(response.items.length).toBeGreaterThan(1);

    expect(response.items[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        cal: expect.any(Number),
        carbs: expect.any(Number),
        fat: expect.any(Number),
        protein: expect.any(Number),
        weight: expect.any(Number),
      }),
    );
  }, 20000);
});
