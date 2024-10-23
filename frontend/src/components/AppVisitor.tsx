import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useController } from '../contexts/Controller.Context';
import LoginScreen from './visitor/LoginScreen';
import UseKeyMovePress from './visitor/UseKeyMovePress';


const AppVisitor = () => {
    const { isLeft, isRight, isDown, isUp } = UseKeyMovePress();
    const animationFrameId = useRef<number | null>(null);

    const controller = useController();

    function onJoined(username: string) {
        if (controller.state === 'online' && !controller.joined) {
            controller.JOIN_visitor(username);
        }
    }

    const loop = () => {
        onMove();
        animationFrameId.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        if (!controller.joined) return;

        animationFrameId.current = requestAnimationFrame(loop);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isLeft, isRight, isDown, isUp]);

    const onMove = () => {
        if (isLeft) {
            controller.MOVE(-1, 0);
        }
        if (isRight) {
            controller.MOVE(1, 0);
        }
        if (isUp) {
            controller.MOVE(0, -1);
        }
        if (isDown) {
            controller.MOVE(0, 1);
        }
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
                    <div>JOINED</div>
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