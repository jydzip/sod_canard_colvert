from websockets.asyncio.server import ServerConnection


class Duck:
    def __init__(self, ws: ServerConnection, username: str):
        self.ws = ws
        self.username = username

    def to_dict(self):
        return {
            "id": str(self.ws.id),
            "username": self.username
        }