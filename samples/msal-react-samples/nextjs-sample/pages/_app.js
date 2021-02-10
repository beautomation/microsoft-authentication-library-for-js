// From Material-ui nextjs sample https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../src/authConfig";
import { PageLayout } from "../src/ui";
import Grid from "@material-ui/core/Grid";

const msalInstance = new PublicClientApplication(msalConfig);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  // This config is optional. Use it if you want to take advantage of the router's client side navigation when msal redirects between pages in your app
  const config = {
    clientSideNavigate: async (path, search, hash) => {
      router.push(path);
    }
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>MSAL-React Next.js Sample</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MsalProvider instance={msalInstance} config={config}>
            <PageLayout>
              <Grid container justify="center">
                <Component {...pageProps} />
              </Grid>
            </PageLayout>
        </MsalProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};