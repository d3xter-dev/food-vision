import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  async compressImage(image: Express.Multer.File): Promise<Buffer> {
    const file = sharp(image.buffer);
    const { format } = await file.metadata();

    const config = {
      heif: { quality: 80, compression: 'av1' },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      png: { compressionLevel: 8 },
    };

    const res = await file[format](config[format] ?? { quality: 80 });

    return res.resize(1024, 1024, { fit: 'inside' }).toFormat('jpeg').toBuffer();
  }

  hashImage(image: Buffer): string {
    return crypto.createHash('sha256').update(image).digest('hex');
  }

  toBase64(image: Express.Multer.File | Buffer): string {
    return 'data:image/*;base64,' + Buffer.from(image.buffer).toString('base64');
  }

  toBuffer(base64: string): Buffer {
    return Buffer.from(base64, 'base64');
  }
}
