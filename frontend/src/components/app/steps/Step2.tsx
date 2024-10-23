import { styled } from "styled-components";


const Step2 = () => {
    return (
        <ContentVideo>
            <video controls autoPlay muted loop>
                <source src="/videos/duck_plonge.mp4" type="video/mp4" />
            </video>
        </ContentVideo>
    )
};
export default Step2;


const ContentVideo = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    & video {
        width: 100%;
        height: 100%;
    }
`