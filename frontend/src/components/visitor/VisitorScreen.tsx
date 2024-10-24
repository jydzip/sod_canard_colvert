import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Joystick } from 'react-joystick-component';

import { useController } from "../../contexts/Controller.Context";

type JoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD";
export interface IJoystickUpdateEvent {
    type: "move" | "stop" | "start";
    x: number | null;
    y: number | null;
    direction: JoystickDirection | null;
    distance: number; 
}

interface LoginScreenProps {
    onMove: (x: number, y: number) => void;
}
const VisitorScreen = ({ onMove }: LoginScreenProps) => {
    let ctxJoystick: {x: number, y: number} | null = null;
    const animationFrameId = useRef<number | null>(null);

    const controller = useController();

    function handleMove(data: IJoystickUpdateEvent) {
        ctxJoystick = {x: data.x, y: data.y};
        onMove(data.x, data.y);
    }

    function handleStart() {
        animationFrameId.current = requestAnimationFrame(loop);
    }

    function handleStop() {
        ctxJoystick = null;
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    }

    const loop = () => {
        if (ctxJoystick) {
            let ctxY = 0;
            if (ctxJoystick.y > 0) {
                ctxY = -ctxJoystick.y;
            }
            else {
                ctxY = Math.abs(ctxJoystick.y);
            }
            onMove(ctxJoystick.x, ctxY);
        }
        
        animationFrameId.current = requestAnimationFrame(loop);
    };

    function activateFlyMode() {
        controller.MOVE_Fly();
    }

    function activateKwak() {
        controller.KWAK();
    }

    useEffect(() => {
        controller.CONTROLLER_init();
    }, []);

    return (
        <>
            <JoystickGlobal>
                <Joystick
                    size={window.window.innerHeight / 2}
                    baseColor="#2F2422"
                    stickColor="#0C7A50"
                    stickImage="/joystick.png"
                    move={handleMove}
                    stop={handleStop}
                    start={handleStart}
                    throttle={200}
                >
                </Joystick>
                <Help><img src="/info.png" /> Joystick</Help>
            </JoystickGlobal>
            <Button onClick={() => activateFlyMode()}>🪽 FLY MODE</Button>
            <Button onClick={() => activateKwak()}>🦆 Kwak kwak!</Button>
        </>
    )
};
export default VisitorScreen;


const JoystickGlobal = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%);

  & button {
    box-shadow: inset 0px 0px 19px 0px #6AC09F;
  }
  & div {
    border: 5px solid #b7acaa4a;
  }
`

const Button = styled.div`
    font-size: 30px;
    text-shadow: none !important;
    color: #ffffffbd;
    background: #0C7A50;
    padding: 10px 50px;
    border-radius: 13px;
    cursor: pointer;
    box-shadow: 2px 5px 20px #000000, inset 0px -5px 3px #a3b736;
    margin: 15px 30px;
`
const Help = styled.div`
    border: 0 !important;
    text-align: center;
    font-size: 26px;
    text-shadow: none;
    color: #ababab66;
    font-style: italic;
    margin-top: 15px;
    & img {
        opacity: 0.3;
        position: relative;
        z-index: -1;
    }
`