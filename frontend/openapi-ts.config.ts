import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: 'http://localhost:3000/api-yaml',
    output: './src/client',
    types: {
        enums: 'javascript',
    },
})
