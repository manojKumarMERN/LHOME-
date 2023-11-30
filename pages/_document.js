import Document, { Html, Head,Main, NextScript } from "next/document";
export default class MyDocuent extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=AW-11425373624"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11425373624');
        `,
                        }}
                    />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}