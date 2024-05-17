import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenaiRequestBuilder } from './openai-request-builder';
import * as crypto from 'crypto';

export type AnalysisResultItem = {
  id: string;
  name: string;
  cal: number;
  carbs: number;
  fat: number;
  protein: number;
  weight: number;
};

export type AnalysisResult = {
  items: AnalysisResultItem[];
};

@Injectable()
export class OpenaiService {
  private readonly key: string = this.configService.get<string>('openai.key');

  constructor(private readonly configService: ConfigService) {}

  async analyzeImage(image: string): Promise<AnalysisResult> {
    if (!image) throw new Error('No image provided.');

    const builder = new OpenaiRequestBuilder(this.key);
    const prompt = `You act as AI Tool to get nutrition facts for food items.
                    The Uploaded Image should be scanned for food items.
                    make a list of JSON objects with "name, cal, carbs, fat, protein, weight".
                    The returned JSON object should be in the following format:
                    { items: [{name: string; cal: number; carbs: number; fat: number; protein: number; weight: number;}] }
                    `;
    builder.addSystemMessage(prompt);
    builder.addUserMessage([{ type: 'image_url', image_url: { url: image } }]);

    const res = await builder.send();
    const items = (JSON.parse(res.choices[0].message.content)?.items ?? []) as AnalysisResultItem[];

    return { items: items.map((item) => ({ ...item, id: crypto.randomUUID() }) as AnalysisResultItem) };
  }
}
