import { Component, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import { CONTROLLER_WS } from '../Constants';
import { StateController, DucksData } from '../types/controller.i';
import { Duck } from '../components/app/Duck';

export const ControllerState = {
    state: 'loading' as StateController,
    socket: null as unknown as WebSocket,
    joined: false,
    started: false,

    ducks: {} as DucksData,
    duckState: 0,
    lakeWidht: 0,
    addDuck: (_key: string) => {},
    moveDuck: (_key: string, _x: number, _y: number) => {},
    deadDuck: (_key: string) => {},

    JOIN_host: () => {},
    JOIN_visitor: (_username: string) => {},
    MOVE: (_x: number, _y: number) => {},
    MOVE_Fly: () => {},
    KWAK: () => {},
    KWAK_End: (_key: string) => {},
    LAKE_init: (_width: number) => {},
    CONTROLLER_init: () => {}
}
const ControllerContext = createContext(ControllerState)

const useController = () => useContext(ControllerContext);

class ControllerProvider extends Component {
    started = false;
    state = {
        state: 'loading' as StateController,
        socket: null as unknown as WebSocket,
        joined: false,
        started: false,
        ducks: {} as DucksData,
        duckState: 0,
        lakeWidht: 0
    }

    componentDidMount() {
        this.login();
    }

    login() {
        if (this.started) return;
        console.log("[Controller] Connecting ...");
        this.started = true;
        try {
            const socket = new WebSocket(CONTROLLER_WS);
            this.setState({ socket });

            socket.onopen = () => {
                console.log('[Controller] connected !');
                this.setState({ state: 'online' });
            };
    
            socket.onmessage = (event) => {
                console.log("[Controller] Message received: ", event.data);
                
                const data = JSON.parse(event.data);
                const message = data.message;
                const error = data.error;

                if (error) {
                    toast(error);
                }

                if (message === 'server__join') {
                    this.setState({
                        joined: data['is_joined'],
                    });
                    if (data['is_joined'] && !data['is_host']) {
                        this.addDuck(data['id'], data["username"]);
                    }
                }

                else if (message === 'server__new_duck') {
                    this.addDuck(data["duck"]['id'], data["duck"]["username"]);
                }
                else if (message === 'server__move') {
                    this.moveDuck(data['id'], data['x'], data['y']);
                }
                else if (message === 'server__move_fly') {
                    const duck = this.state.ducks[data['id']];
                    if (duck) {
                        duck.duck.fly = true;
                        this.setState({ 
                            duckState: this.state.duckState + 1
                        });
                    }
                }
                else if (message === 'server__leave_duck') {
                    this.removeDuck(data['id']);
                }
                else if (message === 'server__kwak') {
                    const duck = this.state.ducks[data['id']];
                    if (duck) {
                        duck.duck.kwak = true;
                        this.setState({ 
                            duckState: this.state.duckState + 1
                        });
                    }
                }
            };
    
            socket.onclose  = () => {
                console.log('[Controller] disconnected-');
                this.setState({
                    state: 'offline',
                    socket: null
                });
                this.started = false;
            };
        } catch (error) {
            console.error("[Controller] Connection error: ", error);
            this.setState({
                state: 'offline',
                socket: null
            });
            this.started = false;
        }
    }

    private send(message: string, data: Record<string, any> = {}) {
        if (this.state.socket && this.state.socket.readyState === WebSocket.OPEN) {
            this.state.socket.send(JSON.stringify({
                'message': message,
                'data': data
            }));
        }
    }

    JOIN_host() {
        console.log("[Controller#JOIN] Host");
        this.send('server__join', {
            'type': 1
        });
    }

    JOIN_visitor(username: string) {
        console.log("[Controller#JOIN] Visitor");
        this.send('server__join', {
            'type': 2,
            'username': username
        });
    }

    MOVE(x: number, y: number) {
        if (!this.state.started) return;
        console.log("[Controller#MOVE]", x, y);
        this.send('server__move', {
            'x': x,
            'y': y
        });
    }

    MOVE_Fly() {
        if (!this.state.started) return;
        console.log("[Controller#MOVE] Activate fly");
        this.send('server__move_fly');
    }

    KWAK() {
        if (!this.state.started) return;
        console.log("[Controller#KWAK]");
        this.send('server__kwak');
    }

    CONTROLLER_init() {
        this.setState({ started: true });
    }

    LAKE_init(width: number) {
        this.setState({ lakeWidht: width });
        for (const key in this.state.ducks) {
            this.state.ducks[key].duck.randomizePosition(width);
        }
    }

    addDuck(key: string, username: string) {
        const duck = new Duck(key, username);
        duck.randomizePosition(this.state.lakeWidht);
        this.setState({ 
            ducks: {
                ...this.state.ducks,
                [key]: {
                    element: null,
                    duck
                }
            },
            duckState: this.state.duckState + 1
        });
        console.log('[Controller#NEW Duck]', key);
    }

    removeDuck(key: string) {
        const duck = this.state.ducks[key];
        if (duck) {
            delete this.state.ducks[key];
            this.setState({ 
                ducks: {
                    ...this.state.ducks,
                },
                duckState: this.state.duckState + 1
            });
            console.log('[Controller#Remove Duck]', key);
        }
    }

    moveDuck(key: string, x: number, y: number) {
        if (!this.state.started) return;
        const duck = this.state.ducks[key];
        if (duck) {
            const fakeX = duck.duck.x + x;
            const fakeY = duck.duck.y + y;
            const duckWidth = 150;
            const lakeWidth = this.state.lakeWidht;

            let needUpdate = false;

            if (x < 0 && !duck.duck.isLeft) {
                duck.duck.isLeft = true;
                duck.duck.isRight = false;
                needUpdate = true;
            }
            else if (x > 0 && !duck.duck.isRight) {
                duck.duck.isLeft = false;
                duck.duck.isRight = true;
                needUpdate = true;
            }

            if (duck.duck.fly) {
                if (fakeX <= lakeWidth - duckWidth && fakeX >= duckWidth / 2) {
                    duck.duck.x = fakeX;
                    needUpdate = true;
                }
    
                if (fakeY <= 20 && fakeY >= -(window.innerHeight - 120)) {
                    duck.duck.y = fakeY;
                    needUpdate = true;
                }
            }
            else {
                if (fakeX <= lakeWidth - duckWidth && fakeX >= duckWidth / 2) {
                    duck.duck.x = fakeX;
                    needUpdate = true;
                }
    
                if (fakeY <= 20 && fakeY >= -40) {
                    duck.duck.y = fakeY;
                    needUpdate = true;
                }
            }

            if (needUpdate){
                this.setState({ 
                    duckState: this.state.duckState + 1
                });
            }
        }
    }

    deadDuck(key: string) {
        if (!this.state.started) return;
        const duck = this.state.ducks[key];
        if (duck) {
            console.log("[Controller#DEAD]", key);
            this.send('server__dead', {
                'id': key
            });
            this.removeDuck(key);
        }
    }

    KWAK_End(key: string) {
        const duck = this.state.ducks[key];
        if (duck) {
            duck.duck.kwak = false;
            this.setState({ 
                duckState: this.state.duckState + 1
            });
        }
    }

    render() {
        // @ts-ignore
        const { children } = this.props
        const value = {
            state: this.state.state,
            socket: this.state.socket,
            joined: this.state.joined,
            started: this.state.started,
            ducks: this.state.ducks,
            duckState: this.state.duckState,
            lakeWidht: this.state.lakeWidht,
            JOIN_host: this.JOIN_host.bind(this),
            JOIN_visitor: this.JOIN_visitor.bind(this),
            MOVE: this.MOVE.bind(this),
            MOVE_Fly: this.MOVE_Fly.bind(this),
            KWAK: this.KWAK.bind(this),
            KWAK_End: this.KWAK_End.bind(this),
            LAKE_init: this.LAKE_init.bind(this),
            CONTROLLER_init: this.CONTROLLER_init.bind(this),
            addDuck: this.addDuck.bind(this),
            moveDuck: this.moveDuck.bind(this),
            deadDuck: this.deadDuck.bind(this)
        }
        return (
            <ControllerContext.Provider value={value}>
                {children}
            </ControllerContext.Provider>
        )
    }
}

export default ControllerContext
export { ControllerProvider, useController };
