import { createClient } from '@urql/vue'

export const client = createClient({
  url: 'http://localhost:5000/',
})
