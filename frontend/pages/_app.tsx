import React from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { GlobalStyle } from '../src/Styled'
import { ControllerProvider } from '../src/contexts/Controller.Context'

import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ControllerProvider>
                <GlobalStyle />
                <ToastContainer
                    theme="dark"
                />
                <Component {...pageProps} />
            </ControllerProvider>
        </>
    )
}