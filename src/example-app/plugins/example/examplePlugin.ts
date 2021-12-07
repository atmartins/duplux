import { Plugin, Dispatcher } from '../../../framework/types';
import { CombinedState, Action } from '../../shared/store';
import ExampleComponent from './ExampleComponent';

export const examplePlugin = (): Plugin<CombinedState, Action> => {
    return {
        name: 'examplePlugin',
        handlers: [
            {
                respondOn: '$.shared.exampleData1',
                callback: async (dispatcher: Dispatcher<Action>, state: CombinedState) => {
                    if (state.shared.exampleData1 === 'example payload 1, from client') {
                        console.log('server side of plugin is responding to example payload 1');
                        setTimeout(() => {
                            dispatcher.dispatchAction({
                                type: 'shared/exampleAction1',
                                payload: 'example payload 2, from server',
                            });
                        }, 2000);
                        return;
                    }
                }
            },
        ],
        getHtmlComponent: () => ExampleComponent,
    };
};
