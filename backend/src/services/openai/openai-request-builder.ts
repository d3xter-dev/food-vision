import OpenAI from 'openai';
import {
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionCreateParams,
} from 'openai/resources';
import { Stream } from 'openai/streaming';

export class OpenaiRequestBuilder {
  private readonly apiKey: string;
  private model: string;
  private readonly messages: Array<ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam>;
  private responseFormat: ChatCompletionCreateParams.ResponseFormat;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('API Key is required');

    this.apiKey = apiKey;
    this.model = 'gpt-4o';
    this.messages = [];
    this.responseFormat = { type: 'json_object' };
  }

  setModel(model: string): this {
    this.model = model;
    return this;
  }

  addSystemMessage(content: string): this {
    this.messages.push({ role: 'system', content });
    return this;
  }

  addUserMessage(content: string | { type: 'image_url'; image_url: { url: string } }[]): this {
    this.messages.push({ role: 'user', content });
    return this;
  }

  setResponseFormat(format: ChatCompletionCreateParams.ResponseFormat): this {
    this.responseFormat = format;
    return this;
  }

  async send(): Promise<ChatCompletion> {
    const openai = new OpenAI({ apiKey: this.apiKey });
    return openai.chat.completions.create({
      model: this.model,
      messages: this.messages,
      response_format: this.responseFormat,
    });
  }

  async stream(): Promise<Stream<ChatCompletionChunk>> {
    const openai = new OpenAI({ apiKey: this.apiKey });
    return openai.chat.completions.create({
      stream: true,
      model: this.model,
      messages: this.messages,
      response_format: this.responseFormat,
    });
  }
}
