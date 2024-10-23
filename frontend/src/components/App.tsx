import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useController } from '../contexts/Controller.Context';
import MainScreen from './app/MainScreen';
import PlayScreen from './app/PlayScreen';


const App = () => {
    const [started, setStarted] = useState<boolean>(false);

    const controller = useController();

    useEffect(() => {
        async function start() {
            await waitForEnterKeyPress();
            setStarted(true);
        }
        start();
    }, []);

    useEffect(() => {
        if (controller.state === 'online') {
            controller.JOIN_host();
        }
    }, [controller.state]);

    return (
        <AppGlobal>
            <StateStatus>
                Status: {controller.state}
            </StateStatus>
            
            <AnimatePresence>
                {!started ? (
                    <MainScreen />
                ) : (
                    <PlayScreen />
                )}
            </AnimatePresence>
        </AppGlobal>
    )
}
export default App;

function waitForEnterKeyPress(): Promise<void> {
    return new Promise<void>((resolve) => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                document.removeEventListener('keydown', handleKeyDown);
                resolve();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    });
}


const AppGlobal = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
`

const StateStatus = styled.div`
    position: fixed;
    bottom: 26px;
    z-index: 99;
    width: 100%;
    text-align: right;
    padding-right: 34px;
    box-sizing: border-box;
    text-shadow: none;
    font-size: 26px;
    opacity: 0.2;
`