import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{background: "black", minHeight:"100vh", alignItems:"center"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
