import { server } from '../../framework/server';
import { combinedStoreCreator } from '../shared/store';
import plugins from '../plugins';

server(combinedStoreCreator, plugins);
console.log('Serving on port 3001');
