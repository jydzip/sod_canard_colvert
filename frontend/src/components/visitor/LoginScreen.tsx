import { Input } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

interface LoginScreenProps {
    onJoined: (username: string) => void;
}
const LoginScreen = ({ onJoined }: LoginScreenProps) => {
    const [username, setUsername] = useState(`Duck${Math.random().toString(4).slice(-4)}`);

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function Join() {
        if (!username) return;
        onJoined(username);
    }

    return (
        <>
            <Content>
                <h4>Enter your username:</h4>
                <Input
                    placeholder="Username"
                    onChange={onChangeUsername}
                    value={username}
                />
            </Content>
            <TouchEnter
                initial={{ scale: 1, x: "-50%", y: "-50%", color: '#ffffffbd' }}
                animate={{ scale: [1, 0.8, 1.1, 1], color: ['#ffffffbd',  '#c6ffb3'] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                onClick={() => Join()}
            >
                Join
            </TouchEnter>
        </>
    )
};
export default LoginScreen;

const TouchEnter = styled(motion.div)`
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 50px;
    text-shadow: none !important;
    color: #ffffffbd;
    background: #0C7A50;
    padding: 10px 50px;
    border-radius: 13px;
    cursor: pointer;
    box-shadow: 2px 5px 20px #000000, inset 0px -5px 3px #a3b736;
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
  margin: 0 20px;

  & input {
    height: 60px;
    font-size: 35px;
    background: #ebddc3 !important;
    color: #2F2422 !important;
    border: 3px solid #0c7a55 !important;
    font-weight: 600;
    width: 90%;
  }
  & h4 {
    margin: 0;
    font-size: 32px;
    text-align: left;
    font-weight: 200;
  }
`