import { ImageFileValidator } from './image-file-validator';
import { getSampleImage } from '../../test/utils';

describe('ImageFileValidator', () => {
  let validator: ImageFileValidator;

  beforeEach(() => {
    validator = new ImageFileValidator({});
  });

  const getMockFile = () => {
    const base64Image = getSampleImage('small-food-image.webp');
    return {
      buffer: Buffer.from(base64Image, 'base64'),
    } as Express.Multer.File;
  };

  it('should return true if file is valid', async () => {
    expect(await validator.isValid(getMockFile())).toBe(true);
  });

  it('should return false if no file is provided', async () => {
    expect(await validator.isValid(undefined)).toBe(false);
  });

  it('validates an array of files', async () => {
    const mockFile = getMockFile();
    expect(await validator.isValid([mockFile, mockFile])).toBe(true);
  });

  it('should return false if the file size exceeds the maximum size', async () => {
    const mockFile = getMockFile();
    const validator = new ImageFileValidator({
      maxSize: 1000,
    });
    expect(await validator.isValid(mockFile)).toBe(false);
  });

  it('should return false if the file type is not supported', async () => {
    const mockFile = {
      buffer: Buffer.from('abc'),
    } as Express.Multer.File;

    expect(await validator.isValid(mockFile)).toBe(false);
  });
});
