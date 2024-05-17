import { OpenaiRequestBuilder } from './openai-request-builder';
import { ChatCompletionCreateParams } from 'openai/resources';

describe('OpenAIRequestBuilder', () => {
  let builder: OpenaiRequestBuilder;

  beforeEach(() => {
    builder = new OpenaiRequestBuilder('test-api-key');
  });

  it('should throw an error if the api key is not set', () => {
    expect(() => new OpenaiRequestBuilder('')).toThrow('API Key is required');
  });

  it('should set the model correctly', () => {
    builder.setModel('test-model');
    expect(builder['model']).toBe('test-model');
  });

  it('should add a system message correctly', () => {
    builder.addSystemMessage('test-system-message');
    expect(builder['messages']).toContainEqual({
      role: 'system',
      content: 'test-system-message',
    });
  });

  it('should add a user message correctly', () => {
    builder.addUserMessage('test-user-message');
    expect(builder['messages']).toContainEqual({
      role: 'user',
      content: 'test-user-message',
    });
  });

  it('should set the response format correctly', () => {
    const format: ChatCompletionCreateParams.ResponseFormat = {
      type: 'text',
    };
    builder.setResponseFormat(format);
    expect(builder['responseFormat']).toEqual(format);
  });
});
