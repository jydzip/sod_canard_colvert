import { Col, Row } from "antd";
import { styled } from "styled-components";
import { Title } from "./StepIntro";
import { motion } from "framer-motion";
import AnimatedText from "../../AnimatedText";


const StepEnding = () => {
    return (
        <Row justify={"center"}>
            <Col span={24} style={{ position: "absolute" }}>
                <Title>Thank You</Title>
            </Col>

            <ColStyled span={24} style={{ marginTop: "150px" }}>
                <QuestionLabel>
                    <span className='q'>
                        <AnimatedText text={'I am available for any questions.'} ms={50} />
                        <motion.img
                            initial={{ rotate: "-8deg", opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: [2.5, 0.5, 1] }}
                            transition={{ duration: 0.7, delay: (60 * 60) / 1000 }}
                            src='./patpat_duck.png'
                            className='a'
                        />
                        <motion.img
                            initial={{ rotate: "28deg", opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: [2.5, 0.5, 1] }}
                            transition={{ duration: 0.8, delay: ((60 * 60) / 1000 + 0.5) }}
                            src='./patpat_duck_flip.png'
                            className='b'
                        />
                    </span>
                </QuestionLabel>
            </ColStyled>

            <ColStyled span={24}  style={{ marginTop: "150px" }}>
                <>
                    <CardGithub>
                        <img src='https://avatars.githubusercontent.com/u/159121042?v=4' className="avatar" />
                        <p className='link'>https://github.com/jydzip</p>
                        <img src='./github_logo.png' className="logo" />
                        <CardGithubContent>
                            <p>Repo: <span className="mark">sod_canard_colvert</span></p>
                            <img src='./ts_logo.png' className="ts" />
                        </CardGithubContent>
                    </CardGithub>
                    <QRCode>
                        <img src='./qrcode.png' />
                    </QRCode>
                </>
            </ColStyled>
        </Row>
    )
};
export default StepEnding;


const ColStyled = styled(Col)`
  text-align: center;
  font-size: 38px;
`

const CardGithub = styled.div`
    background: #0000004f;
    max-width: 580px;
    height: 220px;
    padding: 12px;
    box-sizing: border-box;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    border: 1px solid #ffffff29;
    border-radius: 10px 25px;
    position: relative;
    margin-top: -35px;
    border-top-color: #ffffff4d;
    border-bottom-width: 5px;

    & img.avatar {
        height: 90%;
        width: auto;
        margin-left: 2%;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 3px 3px 0 #5cbbff, -3px -3px 0 #5cbbff, -4px 3px 0 #5cbbff, 4px -2px 0 #5cbbff;
    }
    & img.logo {
        width: 110px;
        position: absolute;
        right: -7px;
        bottom: 13px;
    }
    & img.ts {
        width: 33px;
        position: absolute;
        right: 95px;
        bottom: 13px;
        opacity: 0.8
    }
    & span.mark {
        background: #575757;
        padding: 3px 7px;
        box-sizing: border-box;
        border-radius: 7px;
        font-size: 26px;
        margin: 0 5px;
    }
    & .link {
        position: absolute;
        bottom: 0;
        font-family: cursive;
        margin-left: -23px;
        font-size: 31px;
        margin-bottom: 7px;
    }
`
const CardGithubContent = styled.div`
    flex: 1;
    margin-left: 15px;
    height: 100%;
    font-size: 24px;
`
const QRCode = styled.div`
    width: 200px;
    position: absolute;
    right: 10px;
    bottom: 11px;
    height: 200px;
    background: #10101042;
    border-radius: 0 0 30px 0;
    & img {
        width: 100% !important;
        margin-left: 0 !important;
        opacity: 1 !important;
    }
`

const QuestionLabel = styled.div`
    font-size: 39px;
    color: #f4ffb4;
    margin-top: 20px;

    & span.q {
        position: relative;
    }
    & img {
        position: absolute;
        margin-left: 0 !important;
    }
    & img.a {
        width: 40px !important;
        left: -8px;
        top: -36px;
    }
    & img.b {
        width: 32px !important;
        right: -20px;
        bottom: -33px;
    }
`