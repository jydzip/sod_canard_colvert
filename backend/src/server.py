from __future__ import annotations
import asyncio
import json
from websockets.asyncio.server import serve, ServerConnection

from .duck import Duck
from config import APP_DEBUG, APP_PORT

class Server:
    sockets: set[ServerConnection]
    ducks: dict[str, Duck]
    duckHost: ServerConnection

    def __init__(self):
        if APP_DEBUG:
            print("/!\\ DEBUG MODE /!\\")
        self.host = "0.0.0.0"
        self.port = APP_PORT

        self.sockets = set()
        self.ducks = {}
        self.duckHost = None

        print(f"- Server initialized on {self.host}:{self.port}")

    async def register(self, websocket: ServerConnection):
        self.sockets.add(websocket)

    async def unregister(self, websocket: ServerConnection):
        if self.duckHost:
            if websocket == self.duckHost:
                await self.disconnect_ducks()
                self.duckHost = None
            else:
                await self.__send(self.duckHost, {
                    "message": "server__leave_duck",
                    "id": str(websocket.id)
                })
        

        self.sockets.remove(websocket)
        if websocket.id in self.ducks:
            del self.ducks[websocket.id]

    async def join_duck(self, websocket: ServerConnection, data: dict):
        print(f"[Server] NEW duck {websocket.remote_address} # {data['username']}")
        duck = Duck(websocket, data['username'])
        self.ducks[websocket.id] = duck
        
        await self.__send(self.duckHost, {
            "message": "server__new_duck",
            "duck": duck.to_dict()
        })

    async def move_duck(self, websocket: ServerConnection, data: dict):
        await self.__send(self.duckHost, {
            "status": "success",
            "message": "server__move",
            "id": str(websocket.id),
            "x": data["x"],
            "y": data["y"]
        })

    async def disconnect_ducks(self):
        for duck in self.ducks.values():
            await self.__send(duck.ws, {
                "status": "success",
                "message": "server__join",
                "is_joined": False
            })

    async def handler(self, websocket: ServerConnection):
        print(f"[Server] NEW {websocket.remote_address}")
        await self.register(websocket)

        try:
            async for message in websocket:
                json_message = json.loads(message)
                msg: str = json_message.get("message")
                data: dict = json_message.get("data")

                if msg == "server__join":
                    if data['type'] == 1:
                        print("[Server] Host connected")
                        self.duckHost = websocket
                    else:
                        if not self.duckHost:
                            print("[Server] Host not ready")
                            await self.__send(websocket, {"error": "Host not ready"})
                            continue
                        await self.join_duck(websocket, data)

                    await self.__send(websocket, {
                        "status": "success",
                        "message": "server__join",
                        "is_joined": True,
                        "is_host": data['type'] == 1,
                        "id": str(websocket.id)
                    })
                    continue
                
                if not self.duckHost:
                    print("[Server] Host not ready")
                    await self.__send(websocket, {"error": "Host not ready"})
                    continue

                await self.handler_message(websocket, msg, data)
        except Exception as e:
            print(f"[Server # {websocket.remote_address}] Error: {e}")
        finally:
            await self.unregister(websocket)
            print(f"[Server] Close {websocket.remote_address}")
    
    async def handler_message(self, websocket: ServerConnection, msg: str, data: dict):
        if msg == "server__move":
            await self.move_duck(websocket, data)

    async def start(self):
        async with serve(self.handler, self.host, self.port):
            await asyncio.get_running_loop().create_future()

    async def __send(self, websocket: ServerConnection, data: dict):
        try:
            await websocket.send(json.dumps(data))
        except Exception as e:
            print(f"[SEND # {websocket.remote_address}] Error: {e}")
