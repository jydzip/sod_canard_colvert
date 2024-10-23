import asyncio

from src.server import Server


async def main():
    server = Server()
    await server.start()

if __name__ == "__main__":
    asyncio.run(main())
