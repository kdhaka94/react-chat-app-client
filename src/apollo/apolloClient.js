import {
  ApolloClient,
  InMemoryCache,
  defaultDataIdFromObject,
  ApolloLink,
  from,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { persistCache } from 'apollo-cache-persist';

import possibleTypes from 'possibleTypes.json';
import { typeDefs, resolvers, IS_USER_LOGGED_IN } from 'graphql/func';

export const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id || defaultDataIdFromObject(object),
  possibleTypes,
  addTypename: true,
  // typePolicies,
});

/* await persistCache({
    cache,
    storage: window.localStorage,
})
 */
const retryLink = new RetryLink({
  delay: {
    initial: 3000,
    max: 5000,
    jitter: true,
  },
  attempts: {
    max: Infinity,
    retryIf: ({ message }, b, c, d) => {
      // console.log({ message, b });
      if (message === `Cannot read property 'user' of undefined`) {
        if (!!localStorage.getItem('token')) {
          localStorage.removeItem('token');
          document.location = '/Login';
        }
        return false;
      }
      return true;
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  // eslint-disable-next-line no-unused-expressions
  if (graphQLErrors) {
    graphQLErrors?.map(({ message, locations, extensions }) => {
      console.log({ message, locations, extensions })
      switch (message) {
        case 'You are not logged in':
          if (!!localStorage.getItem('token')) {
            localStorage.removeItem('token');
          }
          document.location = '/Login';
          break;
        default:
          console.log(message);
          break;
      }
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: localStorage.getItem('token') ?? '', // however you get your token
      'client-name': 'React Web',
      ...headers,
    },
  }));
  return forward(operation);
});

const uploadLink = createUploadLink({ uri: process.env.REACT_APP_SERVER_URL });
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_SERVER,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('token'),
    },
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  uploadLink
);

const link = from([errorLink, retryLink, authLink, terminatingLink]);

export const client = new ApolloClient({
  cache,
  typeDefs,
  resolvers: resolvers,
  link,
  // cacheRedirects,
  name: 'react-web-client',
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

function initialWrite() {
  cache.writeQuery({
    query: IS_USER_LOGGED_IN,
    data: { IsLoggedIn: !!localStorage.getItem('token') },
  });
  // try {
  //     const a = cache.readQuery({ query: GET_OPEN_CHATS });
  //     console.log({ a })
  // } catch (err) {
  //     const b = cache.writeQuery({ query: GET_OPEN_CHATS, data: { OpenChats: [] } })
  //     console.log({ b })
  // }
}

initialWrite();

client.onResetStore(initialWrite);
