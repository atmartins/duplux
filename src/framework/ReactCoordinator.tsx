import React from 'react';
import { useDispatch } from 'react-redux';
import { WsMsg } from './types';
import logger from './logger';

let ws;

export const ReactCoordinator = <StateType, ActionType>(props) => {
    const dispatch = useDispatch();
    const [connected, setConnected] = React.useState(false);

    const dispatchAction = (action: ActionType) => {
        logger.green('client action', action);
        dispatch(action);
        const wsMsg: WsMsg<StateType, ActionType> = {
            type: 'action',
            payload: action,
        }
        ws.send(JSON.stringify(wsMsg));
    }

    React.useEffect(() => {
        console.log( 'Initialize plugins running in <App />' );

        ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => {
            console.log('WEBSOCKET OPEN');
            setTimeout(() => {
                setConnected(true);
            },1000)
        };

        ws.onclose = () => {
            console.log('WEBSOCKET CLOSE');
        };

        ws.onmessage = (msg: MessageEvent) => {
            const action = JSON.parse(msg.data);
            logger.blue('server action', action);
            dispatch(action);
        };
    }, []);
    
    if (!connected) return <div>Connecting...</div>;
    
    return (
        <div className='react-coordinator'>
            {props.children({dispatchAction})}
        </div>
    );
}
