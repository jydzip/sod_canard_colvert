import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useController } from "../../contexts/Controller.Context";


const MainScreen = () => {
  let th = 0;
  const [tht, setTht] = useState<string>('');

  const controller = useController();

  useEffect(() => {
    const interval = setInterval(() => {
      let _th = th + 1;
      if (_th > 3) _th = 0
      th = _th;
      setTht(".".repeat(_th));
    }, 500);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <>
      <Background />
      <Shadow
        src="./duck_shadow.png"
        initial={{ rotate: 0, scaleY: 1 }}
        animate={{ rotate: [-5, 5], scaleY: [0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <Acc src="./acc.png" />
      <TouchEnter
        initial={{ scale: 1, x: "-50%", y: "-50%", color: '#ffffffbd' }}
        animate={{ scale: [1, 0.8, 1.1, 1], color: ['#ffffffbd',  '#c6ffb3'] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      >
        Touch ENTER
      </TouchEnter>
      <OnGoing>
        Waiting<span>{tht}</span>
      </OnGoing>
    
      <JoinGlobal>
        <h2>kwak.ekoow.xyz<span>/?key=92800</span></h2>
        <h3>Join SOD!</h3>
        <h4>Kwak kwak-</h4>
        <QRCode>
          <img src='./qrcode_join.png' />
        </QRCode>
      </JoinGlobal>
    
      <CounterDucks>
        # {Object.keys(controller.ducks).length}
      </CounterDucks>
    </>
  )
};
export default MainScreen;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("./bg_overlay.png");
  background-size: 500px;
  animation: backgroundScroll 80s linear infinite;
  @keyframes backgroundScroll {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -100% -100%;
    }
  }
`

const TouchEnter = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 50%;
  font-size: 50px;
  text-shadow: none !important;
  color: #ffffffbd;
`
const Acc = styled.img`
  position: fixed;
  bottom: 0;
  width: 100%;
`
const Shadow = styled(motion.img)`
  position: fixed;
  bottom: 0;
  width: 20%;
  right: 20%;
  opacity: 0.4;
`
const OnGoing = styled.div`
  position: fixed;
  top: 30%;
  transform: translateY(-50%);
  font-size: 90px;
  color: #b3b3b3;
  width: 100%;
  text-align: center;
  background: #00000030;

  & span {
    position: absolute;
  }
`

const JoinGlobal = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  text-align: center;
  text-shadow: none;
  & h2 {
    opacity: 0.5;
    letter-spacing: 1.5px;
    font-size: 38px;
    margin: 0;
    font-weight: 100;
  }
  & h2 span {
    color: #f4ff97;
  }
  h3 {
    margin: 0;
    font-size: 49px;
    position: absolute;
    transform: rotate(-10deg);
    margin-left: -100px;
    color: #ffc328;
    font-weight: 100;
    opacity: 0.8;
    margin-top: 30px;
  }
  h4 {
    margin: 0;
    font-size: 30px;
    position: absolute;
    transform: rotate(17deg);
    margin-left: 410px;
    color: #ffc328;
    font-weight: 100;
    opacity: 0.25;
    margin-top: 110px;
  }
`
const QRCode = styled.div`
  width: 300px;
  height: 300px;
  background: #10101042;
  border-radius: 0 0 30px 0;
  margin: auto;
  & img {
    width: 300px !important;
    margin-left: 0 !important;
    opacity: 1 !important;
  }
`

const CounterDucks = styled.div`
  position: fixed;
  top: 26px;
  z-index: 99;
  width: 100%;
  text-align: left;
  padding-left: 34px;
  box-sizing: border-box;
  text-shadow: none;
  font-size: 26px;
  opacity: 0.2;
`