import React from 'react';
import { mount } from 'enzyme';
import { findTestWrapper } from '../../../../utils/testUtils';
import TodoList from '../../index';
import { Provider } from 'react-redux';
import store from '../../../../store/index';

it(`
1.Header输入框输入内容
2.点击回车
3.列表中展示用户输入的内容`, () => {
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );
    const toDoInput = findTestWrapper(wrapper, 'input');
    const content = 'learn jest';
    toDoInput.simulate('change', {
        target: { value: content },
    });
    toDoInput.simulate('keyUp', {
        keyCode: 13,
    });
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(listItem.length).toEqual(1);
    expect(listItem.text()).toContain(content);
});
it('测试redux能够变化', () => {
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );
    const Btn = findTestWrapper(wrapper, 'redux-btn');
    const value = findTestWrapper(wrapper, 'redux-value');
    Btn.simulate('click');
    expect(value.text()).toEqual('2');
});
