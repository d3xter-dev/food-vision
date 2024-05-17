import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import * as sharp from 'sharp';
import { getSampleImage } from '../../../test/utils';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return smaller buffer when compressing an image', async () => {
    const base64Image = getSampleImage('small-food-image.webp');

    const mockImage = {
      buffer: Buffer.from(base64Image, 'base64'),
    } as Express.Multer.File;
    const compressedImage = await service.compressImage(mockImage);

    expect(compressedImage.buffer.byteLength).toBeLessThan(mockImage.buffer.byteLength);
  });

  it('it should resize an image to 1024x1024', async () => {
    const base64Image = getSampleImage('large-food-image.webp');
    const mockImage = {
      buffer: Buffer.from(base64Image, 'base64'),
    } as Express.Multer.File;

    const compressedImage = await service.compressImage(mockImage);
    const { width, height } = await sharp(compressedImage).metadata();

    expect(width).toBeLessThanOrEqual(1024);
    expect(height).toBeLessThanOrEqual(1024);
  });

  it('should return a correct hash for an image', () => {
    const mockImage = Buffer.from('mock image');
    const hash = service.hashImage(mockImage);
    expect(hash).toBe('e4b7baafad294c4adb39fcd8a8465e0331459f142b3e55075ede4e109b903b26');
  });

  it('should correctly convert an image to base64', async () => {
    const mockImage = {
      buffer: Buffer.from('mock image'),
    } as Express.Multer.File;
    const base64 = service.toBase64(mockImage);
    expect(base64).toBe('data:image/*;base64,bW9jayBpbWFnZQ==');
  });

  it('should correctly convert a base64 string to buffer', async () => {
    const base64 = 'bW9jayBpbWFnZQ==';
    const buffer = service.toBuffer(base64);
    expect(buffer).toEqual(Buffer.from('mock image'));
  });
});
