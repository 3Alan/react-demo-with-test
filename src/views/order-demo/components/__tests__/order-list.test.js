import React from 'react';
import { mount} from 'enzyme';
import OrderList from '../OrderList';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { findTestWrapperById } from '../../../../utils/testUtils';

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
describe('test orderList component', () => {
  let wrapper;
  let store;

  it('render ok', () => {
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
    wrapper = mount(<Provider store={store}><OrderList /></Provider>);
    expect(wrapper.contains('Alan')).toEqual(true)
  });
  it('列表数据正确渲染并含有退款和转让按钮', () => {
    store = mockStore({
      order: {
        orderList: [
          {
            user: 'Alan',
            orderId: '12321421',
            num: 30,
            price: 100,
            total: 3000,
            refund: false,
            refundOrder: false,
            transferOrder: false
          },
        ],
      },
    });
    wrapper = mount(<Provider store={store}><OrderList /></Provider>);
    expect(findTestWrapperById(wrapper, 'refund').exists()).toEqual(true)
    expect(findTestWrapperById(wrapper, 'transfer').exists()).toEqual(true)
    console.log(store.getState('order').order.orderList);
  });

});
