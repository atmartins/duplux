import { Action } from 'redux';
import { WebSocket } from 'ws';
import { Coordinator } from './ServerCoordinator';
import { initWs } from './websocket';
import { PluginConstructor, StoreCreator } from './types';
import { IncomingMessage } from 'http';

// TODO
// type ChannelId = string;
// type TrackCoordinators<ActionType> = {
//     [a: ChannelId]: Dispatcher<ActionType>[]
// }
const coordinators = [];
export const server = <StateType extends object, ActionType extends Action>(
    storeCreator: StoreCreator<StateType, ActionType>,
    plugins: PluginConstructor<StateType, ActionType>[],
): void => {
    const websocketServer = initWs();

    // const db = initDb();
    websocketServer.on('connection', (ws: WebSocket, request: IncomingMessage) => {
        
        console.log('New Connection');
        coordinators.push(new Coordinator(ws, plugins, storeCreator()));
        coordinators.forEach((coordinator) => {
            coordinator.dispatchAction({
                type: 'shared/numConnections',
                payload: coordinators.length,
            } as any);
        });
        ws.on('close', () => {
            coordinators.forEach((coordinator, idx) => {
                if (coordinator.ws === ws) {
                    coordinators.splice(idx, 1);
                }
            });
            coordinators.forEach((coordinator) => {
                coordinator.dispatchAction({
                    type: 'shared/numConnections',
                    payload: coordinators.length,
                } as any);
            });
            console.log('Closed Connection');
        });
    });

};
