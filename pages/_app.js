import React from 'react';
import '../styles/globals.css';
import '../styles/fonts/stylesheet.css';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/graphql/apollo-client';
import Layout from '../components/layout/layout';
import { AppWrapper } from '../contexts/AppContext';
import { AnimateSharedLayout } from "framer-motion"


// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
      <AppWrapper>
        <AnimateSharedLayout>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </AnimateSharedLayout>
      </AppWrapper>
    </ApolloProvider>
}

export default MyApp;
