import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  split,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'


const httpLink = createUploadLink({
  uri: 'https://fresh-auction.herokuapp.com/graphql',
  headers:{
    "Access-Control-Allow-Origin": "*",
      credentials: "include",
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${JSON.parse(token).accessToken}`
        : '',
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    },
    
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// const client = new ApolloClient({
//   uri:'https://fresh-auction-backend.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
// })
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
