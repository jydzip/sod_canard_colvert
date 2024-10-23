import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import { useController } from '../contexts/Controller.Context';
import LoginScreen from './visitor/LoginScreen';
import VisitorScreen from './visitor/VisitorScreen';


const AppVisitor = () => {
    const controller = useController();

    function onJoined(username: string) {
        if (controller.state === 'online' && !controller.joined) {
            controller.JOIN_visitor(username);
        }
    }

    const onMove = (x: number, y: number) => {
        controller.MOVE(x, y);
    };

    return (
        <AppGlobal>
            <StateStatus>
                Status: {controller.state}
            </StateStatus>
            
            <AnimatePresence>
                {!controller.joined ? (
                    <LoginScreen onJoined={onJoined} />
                ) : (
                    <VisitorScreen onMove={onMove} />
                )}
            </AnimatePresence>
        </AppGlobal>
    )
}
export default AppVisitor;

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