import { Store, Action } from 'redux';
import { WebSocket, RawData } from 'ws';
import { diff } from 'deep-object-diff';
import jp from 'jsonpath';
import { PluginConstructor, Dispatcher, WsMsg, Handler } from './types';

export class Coordinator<StateType extends object, ActionType extends Action> implements Dispatcher<ActionType> {
    ws: WebSocket;
    handlers: Handler<StateType, ActionType>[];
    store: Store<StateType, ActionType>;
    id: number;

    constructor(ws: WebSocket, plugins: PluginConstructor<StateType, ActionType>[], store: Store<StateType, ActionType>) {
        this.ws = ws;
        this.handlers = plugins.reduce((accum, plugin) => accum.concat(plugin().handlers), []);
        this.store = store;
        this.id = Math.random();

        ws.on('message', (evt: RawData) => {
            const wsObj: WsMsg<StateType, ActionType> = JSON.parse(evt.toString());
            console.log('client message', wsObj);
            if (wsObj.type === 'action') this.dispatchServerOnly(wsObj.payload as ActionType);
            if (wsObj.type === 'entireState') {
                console.log('would send entireState');
            }
        });
    }

    // when calling an action originating from the server
    dispatchAction(action: ActionType) {
        this.ws.send(JSON.stringify(action));
        this.dispatchServerOnly(action);
    }

    // when getting an action from the client
    dispatchServerOnly(action: ActionType) {
        const originalState = this.store.getState();
        this.store.dispatch(action);
        const newState = this.store.getState();
        const stateDiff = diff(originalState, newState);
        
        this.handlers.forEach(handler => {
            if (jp.query(stateDiff, handler.respondOn).length > 0) {
                handler.callback(this, this.store.getState())
            }
        });
    }
};
