import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ReactCoordinator } from '../../framework/ReactCoordinator';
import { sharedStoreCreator } from '../shared/store';
import plugins from '../plugins';

const Plugins = ({dispatchAction}) => {
    return (
    <div>
        {plugins && plugins.map((plugin) => {
            const Plugin = plugin().getHtmlComponent();
            return <Plugin dispatchAction={dispatchAction} key={plugin.name} />;
        })}
    </div>
    );
}

// compile App component in `#app` HTML element
ReactDOM.render(
    <Provider store={sharedStoreCreator()}>
        {/* TODO <ReactCoordinator channelId={programId}> */}
        <ReactCoordinator>
            {Plugins}
        </ReactCoordinator>
    </Provider>,
    document.getElementById( 'app' )
)
