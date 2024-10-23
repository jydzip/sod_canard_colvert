import { useEffect, useRef, useState } from 'react';

const UseKeyMovePress = () => {
    const [isDown, setIsDown] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isUp, setIsUp] = useState(false);

    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    setIsLeft(true);
                    break;
                case "ArrowRight":
                    setIsRight(true);
                    break;
                case "ArrowUp":
                    setIsUp(true);
                    break;
                case "ArrowDown":
                    setIsDown(true);
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    setIsLeft(false);
                    break;
                case "ArrowRight":
                    setIsRight(false);
                    break;
                case "ArrowUp":
                    setIsUp(false);
                    break;
                case "ArrowDown":
                    setIsDown(false);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const loop = () => {
        animationFrameId.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(loop);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isLeft, isRight, isDown, isUp]);

    return { isLeft, isRight, isUp, isDown };
};
export default UseKeyMovePress;