import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // All this stuff is necessary so styled-components play well with
  // server-side rendering
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet()

		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)

		const styleTags = sheet.getStyleElement()

		return { ...page, styleTags }
	}

	render() {
		// @ts-ignore
		const { styleTags } = this.props
		return (
      <html>
        <Head>
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
		)
	}
}
