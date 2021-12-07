import { Store, Action } from 'redux';

export interface Dispatcher<ActionType> {
    dispatchAction: (action: ActionType) => void;
    dispatchServerOnly: (action: ActionType) => void;
}

export type StoreCreator<StateType, ActionType extends Action> = () => Store<StateType, ActionType>;

export type PluginConstructor<StateType, ActionType> = () => Plugin<StateType, ActionType>;
export type Handler<StateType, ActionType> = {
    respondOn: string,
    callback: (dispatcher: Dispatcher<ActionType>, state: StateType) => Promise<void>,
}
export type Plugin<StateType, ActionType> = {
    name: string,
    handlers: Handler<StateType, ActionType>[],
    getHtmlComponent: () => (props) => JSX.Element,
}

export type WsMsg<StateType, ActionType> = {
    type: 'action' | 'entireState' | 'multiUserMsg',
    payload: ActionType | StateType | string,
}
