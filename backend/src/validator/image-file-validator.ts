import { FileValidator } from '@nestjs/common';
import * as sharp from 'sharp';

type ImageFileValidatorOptions = {
  readonly maxSize?: number;
};

export class ImageFileValidator extends FileValidator<ImageFileValidatorOptions, Express.Multer.File> {
  buildErrorMessage(): string {
    return 'No valid image file provided.';
  }

  async isValid(file: Express.Multer.File[] | Express.Multer.File | undefined): Promise<boolean> {
    if (!file) return false;

    if (Array.isArray(file)) {
      return file.every((f) => this.isValid(f));
    }

    // only allow formats supported by sharp -> don't trust mime type by file extension
    try {
      const { size } = await sharp(file.buffer).metadata();
      if (this.validationOptions.maxSize) {
        return size !== undefined && size <= this.validationOptions.maxSize;
      }
    } catch (error) {
      return false;
    }

    return true;
  }
}
