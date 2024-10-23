import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'ANTON';
        src: url('./fonts/Anton-Regular.ttf');
    }

    html {
        font-family: ANTON;
        color: #fff;
        text-shadow: 1.5px 1.5px 0 #2e009d, 1.5px -1.5px 0 #2e009d, -1.5px 1.5px 0 #2e009d, -1.5px -1.5px 0 #2e009d, 1.5px 0px 0 #2e009d, 0px 1.5px 0 #2e009d, -1.5px 0px 0 #2e009d, 0px -1.5px 0 #2e009d;
        scroll-behavior: smooth;
    }
    body {
        margin: 0 !important;
        background-size: 12%;
        background-color: #1d1d1d;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
`