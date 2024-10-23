import { Component, createContext, useContext } from 'react';

import { CONTROLLER_WS } from '../Constants';
import { StateController, DucksData } from '../types/controller.i';
import DuckSpine from '../components/app/DuckSpine';
import { Duck } from '../components/app/Duck';

export const ControllerState = {
    state: 'loading' as StateController,
    socket: null as unknown as WebSocket,
    joined: false,

    ducks: {} as DucksData,
    duckState: 0,
    lakeWidht: 0,
    addDuck: (_key: string) => {},
    moveDuck: (_key: string, _x: number, _y: number) => {},

    JOIN_host: () => {},
    JOIN_visitor: (_username: string) => {},
    MOVE: (_x: number, _y: number) => {},
    LAKE_init: (_width: number) => {}
}
const ControllerContext = createContext(ControllerState)

const useController = () => useContext(ControllerContext);

class ControllerProvider extends Component {
    started = false;
    state = {
        state: 'loading' as StateController,
        socket: null as unknown as WebSocket,
        joined: false,
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
                else if (message === 'server__leave_duck') {
                    this.removeDuck(data['id']);
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
        console.log("[Controller#MOVE]", x, y);
        this.send('server__move', {
            'x': x,
            'y': y
        });
    }

    LAKE_init(width: number) {
        this.setState({ lakeWidht: width });
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
        const duck = this.state.ducks[key];
        if (duck) {
            const fakeX = duck.duck.x + x;
            const fakeY = duck.duck.y + y;
            const duckWidth = 150;
            const lakeWidth = this.state.lakeWidht;

            let needUpdate = false;
            
            if (fakeX <= lakeWidth - duckWidth && fakeX >= duckWidth / 2) {
                duck.duck.x = fakeX;
                needUpdate = true;
            }

            if (fakeY <= 20 && fakeY >= -40) {
                duck.duck.y = fakeY;
                needUpdate = true;
            }

            if (needUpdate){
                this.setState({ 
                    duckState: this.state.duckState + 1
                });
            }
        }
    }

    render() {
        // @ts-ignore
        const { children } = this.props
        const value = {
            state: this.state.state,
            socket: this.state.socket,
            joined: this.state.joined,
            ducks: this.state.ducks,
            duckState: this.state.duckState,
            lakeWidht: this.state.lakeWidht,
            JOIN_host: this.JOIN_host.bind(this),
            JOIN_visitor: this.JOIN_visitor.bind(this),
            MOVE: this.MOVE.bind(this),
            LAKE_init: this.LAKE_init.bind(this),
            addDuck: this.addDuck.bind(this),
            moveDuck: this.moveDuck.bind(this)
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
