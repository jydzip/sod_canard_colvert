import { Input } from "antd";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
                    move={handleMove}
                    stop={handleStop}
                    start={handleStart}
                    throttle={200}
                >
                </Joystick>
            </JoystickGlobal>
            <div onClick={() => activateFlyMode()}>FLY MODE</div>
        </>
    )
};
export default VisitorScreen;


const JoystickGlobal = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%);

  & button {
    box-shadow: inset 0px 0px 19px 0px #6AC09F;
  }
  & div {
    border: 5px solid #b7acaa4a;
  }
`