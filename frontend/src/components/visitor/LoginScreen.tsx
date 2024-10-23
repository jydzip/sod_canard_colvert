import { Input } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface LoginScreenProps {
    onJoined: (username: string) => void;
}
const LoginScreen = ({ onJoined }: LoginScreenProps) => {
    const [username, setUsername] = useState(`Duck${Math.random().toString(4).slice(-4)}`);

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }
    return (
        <>
            <Content>
                <Input
                    placeholder="Basic usage"
                    onChange={onChangeUsername}
                    value={username}
                />
            </Content>
            <TouchEnter
                initial={{ scale: 1, x: "-50%", y: "-50%", color: '#ffffffbd' }}
                animate={{ scale: [1, 0.8, 1.1, 1], color: ['#ffffffbd',  '#c6ffb3'] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                onClick={() => onJoined(username)}
            >
                Login
            </TouchEnter>
        </>
    )
};
export default LoginScreen;

const TouchEnter = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 50%;
  font-size: 50px;
  text-shadow: none !important;
  color: #ffffffbd;
`
const Content = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  font-size: 50px;
  transform: translateX(-50%);
  height: 75%;
  width: 100%;
  max-width: 800px;
  text-align: center;
`