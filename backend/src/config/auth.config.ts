import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  apiKey: process.env.API_KEY,
}));
