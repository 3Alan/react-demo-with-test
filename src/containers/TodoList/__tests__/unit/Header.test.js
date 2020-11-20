import React from 'react';
import Header from '../../components/Header';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findTestWrapper } from '../../../../utils/testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('Test <Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    // TDD开发模式，测试用例驱动开发，先写测试用例再开发
    it('应该包含一个input框', () => {
        // // 使用data-test防止于代码产生耦合
        // expect(wrapper.find('[data-test="App"]')).toExist();
        // // 用于调试
        // console.log(wrapper.debug());
        // // expect(wrapper.find('[data-test="App"]').prop('title')).toBe('Alan')
        // expect(wrapper.find('[data-test="App"]')).toHaveProp('title', 'Alan')
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem).toExist();
    });
    it('input 初始化为空', () => {
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem.prop('value')).toEqual('');
    });
    it('input 内容跟随输入变化', () => {
        const inputValue = 'working';
        const inputElem = wrapper.find('[data-test="input"]');
        inputElem.simulate('change', {
            target: { value: inputValue },
        });
        expect(wrapper.find('[data-test="input"]').prop('value')).toEqual(
            inputValue
        );
    });
    it('input 按下回车时，如果input为空，不操作', () => {
        const fn = jest.fn();
        const newWrapper = shallow(<Header addItem={fn} />);
        const inputElem = newWrapper.find('[data-test="input"]');
        inputElem.simulate('keyUp', {
            keyCode: 13,
        });
        expect(fn).not.toHaveBeenCalled();
    });
    it('input 按下回车时，如果input有值，调用函数并清空input框', () => {
        const fn = jest.fn();
        const value = 'learning';
        const newWrapper = shallow(<Header addItem={fn} />);
        const inputElem = findTestWrapper(newWrapper, 'input');
        inputElem.simulate('change', {
            target: { value },
        });
        expect(newWrapper.find('[data-test="input"]').prop('value')).toEqual(
            value
        );
        newWrapper.find('[data-test="input"]').simulate('keyUp', {
            keyCode: 13,
        });
        expect(fn).toHaveBeenCalledWith(value);
    });

    it('Header UI 测试', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
