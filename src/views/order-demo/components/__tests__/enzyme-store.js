import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { sleep } from '../../../../utils/testUtils';
import CreateOrder from '../CreateOrder';
import { Input, Form } from 'antd';
import { act } from 'react-dom/test-utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// mock Select
// jest.mock('antd', () => {
//   const antd = jest.requireActual('antd');

//   const Select = ({ children, onChange }) => {
//     return <select onChange={e => onChange(e.target.value)}>{children}</select>;
//   };

//   Select.Option = ({ children, ...otherProps }) => {
//     return <option {...otherProps}>{children}</option>;
//   }

//   return {
//     ...antd,
//     Select,
//   }
// });

describe('test createOrder component by enzyme', () => {
  let store;
  let wrapper;

  function toggleOpen(wrapper, index) {
    act(() => {
      wrapper.find('.ant-select-selector').at(index).simulate('mousedown');
      jest.runAllTimers();
      wrapper.update();
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
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

  it('填写完信息，能够正确dispatch', async () => {
    wrapper = mount(
      <Provider store={store}>
        <CreateOrder />
      </Provider>
    );
    // 写法参照antd源码写法 https://github.com/ant-design/ant-design/blob/master/components/form/__tests__/index.test.js
    wrapper.find(Input).simulate('change', { target: { value: 60 } });
    toggleOpen(wrapper, 0);
    // 模拟选择用户操作：Bob
    wrapper.find('.ant-select-item-option').at(1).simulate('click');
    toggleOpen(wrapper, 1);
    // 模拟选择课时数操作
    wrapper.find('.ant-select-item-option').at(2).simulate('click');
    // 这里存在异步
    await sleep(50);
    wrapper.find(Form).simulate('submit');
    await sleep(50);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
