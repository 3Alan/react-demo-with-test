import React from 'react';
import { shallow, mount } from 'enzyme';
import UndoList from '../../components/UndoList';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';
import { Provider } from 'react-redux';
import store from '../../../../store/index';

describe('UndoList测试', () => {
    it('初始化 undo数目为0', () => {
        const wrapper = shallow(<UndoList undoList={[]} />);
        const countElem = findTestWrapper(wrapper, 'count');
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(countElem.text()).toEqual('0');
        expect(listItems.length).toEqual(0);
    });

    it('当undo数目不为空时，count显示列表长度，列表不为空', () => {
        const undoList = ['learning', 'gaming'];
        const wrapper = shallow(<UndoList undoList={undoList} />);
        const countElem = findTestWrapper(wrapper, 'count');
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(countElem.text()).toEqual('2');
        expect(listItems.length).toEqual(2);
    });

    it('当undo数目不为空时，点击删除按钮，会调用删除方法，方法传递该项的index', () => {
        const undoList = ['learning', 'gaming'];
        const fn = jest.fn();
        const index = 1;
        const wrapper = shallow(
            <UndoList undoList={undoList} deleteItem={fn} />
        );
        const deleteBtn = findTestWrapper(wrapper, 'delete');
        deleteBtn.at(index).simulate('click', {
            stopPropagation: () => {},
        });
        expect(fn).toHaveBeenLastCalledWith(index);
    });

    it('当某一项被点击时，触发函数', () => {
        const undoList = ['learning', 'gaming'];
        const fn = jest.fn();
        const index = 1;
        const wrapper = shallow(
            <UndoList undoList={undoList} changeStatus={fn} />
        );
        const listItem = findTestWrapper(wrapper, 'list-item');
        listItem.at(index).simulate('click');
        expect(fn).toHaveBeenLastCalledWith(index);
    });
    it('接受undoList、deleteItem、deleteItem参数', () => {
        const wrapper = mount(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        const UndoList = wrapper.find('Provider').find('UndoList');
        expect(UndoList.prop('undoList')).toBeTruthy();
        expect(UndoList.prop('deleteItem')).toBeTruthy();
        expect(UndoList.prop('changeStatus')).toBeTruthy();
    });

    it('编辑todo是调用的参数为(index, value)', () => {
        const undoList = [{ editable: true, value: 'learning jest' }];
        const value = '学习Jest';
        const fn = jest.fn();
        const wrapper = shallow(<UndoList undoList={undoList} editItem={fn} />);
        const inputElem = findTestWrapper(wrapper, 'edit');
        inputElem.simulate('change', {
            target: { value },
        });
        expect(fn).toHaveBeenLastCalledWith(0, value);
    });
});
