import { Col, Row } from "antd";
import { motion } from "framer-motion";
import { styled } from "styled-components";


const StepIntro = () => {
    return (
        <Row justify={"center"}>
            <Col span={24} style={{ position: "absolute" }}>
                <Title>Mallard Duck</Title>
                <SubTitle>(Canard Colvert)</SubTitle>
            </Col>
            <ColStyled span={12} style={{ marginTop: "50px" }}>
                <ul>
                    <li>Weight <span className="mark">750 - 1,450kg</span></li>
                    <li>Size <span className="mark">81 - 98cm</span></li>
                    <li>Life expectancy <span className="mark">5 - 29 years</span></li>
                </ul>

                <Map>
                    <BackMap />
                    <ContentMap
                        initial={{ scale: 5, y: "0%" }}
                        animate={{ scale: 1.7, y: "23%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    >
                        <motion.img
                            src="./world_map_duck.png"
                            className='map'
                        />
                        <motion.img
                            src="./world_map_duck_hover.png"
                            className='hover'
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                        />
                    </ContentMap>
                </Map>
            </ColStyled>
            <ColStyled span={12}  style={{ marginTop: "50px" }}>
                <img src="./ducks.png" style={{ marginTop: "50px" }} />
            </ColStyled>
        </Row>
    )
};
export default StepIntro;


const ColStyled = styled(Col)`
  text-align: center;
  font-size: 38px;
`

const Map = styled.div`
    border: 1px solid #ffffff57;
    border-radius: 12px;
    margin-top: 33px;
    background: #0000003b;
    position: relative;
    overflow: hidden;

    & img {
        max-height: 320px;
        max-width: 80%;
        width: auto !important;
        margin-left: 50% !important;
        transform: translateX(-50%);
    }
    & img.hover {
        position: absolute;
        left: 0;
        top: 0;
    }
    & img.map {
        opacity: 0.7;
    }
`
const BackMap = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("./bg_overlay.png");
    background-size: 310px;
    animation: backgroundScroll 30s linear infinite;
    @keyframes backgroundScroll {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: -100% -100%;
        }
    }
`
const ContentMap = styled(motion.div)`
    
`

export const Title = styled.h1`
    text-align: center;
    font-size: 48px;
    margin: 0;
`
const SubTitle = styled.h2`
    text-align: center;
    font-size: 27px;
    margin: 0;
`