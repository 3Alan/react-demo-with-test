import React from 'react';
import TodoList from './containers/TodoList';
import store from './store/index';
import { Provider } from 'react-redux';
import './utils/mock';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OrderDemo from './views/order-demo/index';
import { Button } from 'antd';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="nav" title="Alan" data-test="App">
          <Button><Link to="/order-demo">orderDemo</Link></Button>
          <Button><Link to="/todo-list">todoList</Link></Button>
        </div>
        <Route path="/order-demo" exact component={OrderDemo} />
        <Route path="/todo-list" exact component={TodoList} />
      </Router>
    </Provider>
  );
}

export default App;
