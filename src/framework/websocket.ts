import { WebSocketServer } from 'ws';

export const initWs = () => {
    const webSocketServer = new WebSocketServer({
        port: 3001,
    });

    return webSocketServer;
}
