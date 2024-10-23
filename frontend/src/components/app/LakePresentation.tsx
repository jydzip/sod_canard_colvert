import { useEffect, useState } from "react";
import styled from "styled-components";

import Step0 from "./steps/StepIntro";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepEnding from "./steps/StepEnding";

const MAX_STEP = 3;

const LakePresentationSteps = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'ArrowRight':
          playNextStep();
          break;
        case 'ArrowLeft':
          playPreviousStep();
          break;
      }
    });
  }, [step]);

  function playNextStep() {
    if (step < MAX_STEP) {
      setStep(step + 1);
    } else {
      console.log("No more step.");
    }
  }

  function playPreviousStep() {
    let newStep = step - 1;
    if (newStep < 0) {
      newStep = 0;
    }
    setStep(newStep);
  }

  if (step === 0) {
    return <Step0 />
  }
  else if (step === 1) {
    return <Step1 />
  }
  else if (step === 2) {
    return <Step2 />
  }
  else if (step === 3) {
    return <StepEnding />
  }
  else {
    return <></>
  }
};

const LakePresentation = () => {
  return (
    <PresentationGlobal>
      <Content>
        <Contentent>

          <LakePresentationSteps />

        </Contentent>
      </Content>
    </PresentationGlobal>
  )
};
export default LakePresentation;


const PresentationGlobal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
`
const Content = styled.div`
  width: 80%;
  height: 76%;
  background: #f1f1f185;
  margin: auto;
  position: relative;
  top: 2%;
  border-radius: 18px;
  box-sizing: border-box;
  padding: 10px;
`
const Contentent = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 7px solid #fff;
  border-radius: 17px;
  box-shadow: inset 0px 0px 4px 20px #98ffd96e;
  padding: 50px;
  text-align: left;

  & ul {
    list-style-type: circle;
    text-align: left;
  }
  & ul li {
    padding: 3px;
  }
  & img {
    width: 80%;
    margin-left: 10%;
    opacity: 0.85;
    border-radius: 5px;
  }
  & span.mark {
    background: #228a3c;
    padding: 3px 7px;
    box-sizing: border-box;
    border-radius: 7px;
    font-size: 25px;
    margin: 0 5px;
  }
`