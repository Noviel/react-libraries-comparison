import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { useStaticRendering } from 'mobx-react';

import { isServer } from '@project/utils/isServer';

useStaticRendering(isServer());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <div>
          Custom app wrapper
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}

export default MyApp;
