import React from 'react';
import { useSelector } from 'react-redux';
import { ExampleAction, SharedState } from '../../shared/store';

const ExampleComponent = (props) => {
    const exampleData1: string = useSelector((state: SharedState) => { console.log(state); return state.exampleData1});
    
    return (
        <div>
            <div>
                <h1>Example Component</h1>
                {exampleData1}
            </div>
            <button onClick={() => {
                const exampleAction: ExampleAction = {
                    type: 'shared/exampleAction1',
                    payload: 'example payload 1, from client',
                };
                props.dispatchAction(exampleAction);
            }}>
                Click me
            </button>
        </div>
    );      
}

export default ExampleComponent;
