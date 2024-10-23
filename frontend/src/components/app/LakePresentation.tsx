import { Col, Row } from "antd";
import styled from "styled-components";


const LakePresentation = () => {
  return (
    <PresentationGlobal>
      <Content>
        <Contentent>

          <Row justify={"center"}>
            <ColStyled span={12}>
              CONTENT 1
            </ColStyled>
            <ColStyled span={12}>
              CONTENT 2
            </ColStyled>
          </Row>

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
`

const ColStyled = styled(Col)`
  text-align: center;
  font-size: 38px;
`