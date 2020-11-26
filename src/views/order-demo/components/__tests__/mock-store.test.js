import React from 'react';
import OrderList from '../OrderList';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import CreateOrder from '../CreateOrder';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

describe('test createOrder component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      order: {
        orderList: [
          {
            user: 'Alan',
            orderId: new Date().valueOf(),
            num: 30,
            price: 100,
            total: 3000,
            refund: false,
          },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  it('render ok', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <OrderList />
      </Provider>
    );
    expect(queryByTestId('user')).toContainHTML('Alan');
  });
  it('填写完信息，能够正确dispatch', async () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <CreateOrder />
      </Provider>
    );

    fireEvent.change(queryByTestId('user'), 'Bob');
    fireEvent.change(queryByTestId('num'), 20);
    fireEvent.change(queryByTestId('price'), { target: { value: 100 } });
    fireEvent.click(queryByTestId('submit'));
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
  });
});
