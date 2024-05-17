import * as fs from 'node:fs';
import * as path from 'node:path';

export function getSampleImage(name: string) {
  const imagePath = path.join(__dirname, 'samples', name);
  const imageBuffer = fs.readFileSync(imagePath);

  return imageBuffer.toString('base64');
}
