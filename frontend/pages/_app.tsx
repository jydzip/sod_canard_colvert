import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../src/Styled'
import { ControllerProvider } from '../src/contexts/Controller.Context'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ControllerProvider>
                <GlobalStyle />
                <Component {...pageProps} />
            </ControllerProvider>
        </>
    )
}