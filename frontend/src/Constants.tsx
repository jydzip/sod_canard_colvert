import config from '../config.json';

const CONTROLLER_HOST = config.CONTROLLER.HOST || "10.1.1.180";
const CONTROLLER_PORT = config.CONTROLLER.PORT || 5000;
const CONTROLLER_SECURE = config.CONTROLLER.SECURE || false;
const CONTROLLER_WS = CONTROLLER_SECURE ? `wss://${CONTROLLER_HOST}/ws/` : `ws://${CONTROLLER_HOST}:${CONTROLLER_PORT}`;

export {
    CONTROLLER_WS
}