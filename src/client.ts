import { authExchange } from '@urql/exchange-auth'
import {
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  makeOperation,
  Operation,
  TypedDocumentNode,
} from '@urql/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const client = createClient({
  url: 'http://localhost:5000/',
  exchanges: [
    dedupExchange,
    errorExchange({
      onError: (error: CombinedError, operation: Operation) => {
        toast.error(error.message.replace('[GraphQL] ', ''))
      },
    }),
    authExchange<{ token: string }>({
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.token) {
          return operation
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {}

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              'x-auth': authState.token,
            },
          },
        })
      },
      getAuth: async ({ authState }) => {
        if (!authState) {
          const token = localStorage.getItem('token')
          if (token) {
            return { token }
          }
          return null
        }
        return null
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        'x-auth': token || '',
      },
    }
  },
})

export const query = <T>(
  query: TypedDocumentNode<any, object>,
  variables: object = {}
) => {
  return client.query<T>(query, variables).toPromise()
}

export const mutation = <T>(
  query: TypedDocumentNode<any, object>,
  variables: object = {}
) => {
  return client.mutation<T>(query, variables).toPromise()
}
