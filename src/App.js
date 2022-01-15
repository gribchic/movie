import React, {useReducer} from 'react';
import './styles/App.scss';
import Main from './components/MainComponent';
import {ContextApp, initialState, reducer} from './shared/reducer';

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <Main/>
        </ContextApp.Provider>
    );
}

export default App;
