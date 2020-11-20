import React from 'react';
import TodoList from './containers/TodoList';
import store from './store/index';
import { Provider } from 'react-redux';
import './utils/mock';

function App() {
    return (
        <Provider store={store}>
            <div className="App" title="Alan" data-test="App">
                <TodoList />
            </div>
        </Provider>
    );
}

export default App;
