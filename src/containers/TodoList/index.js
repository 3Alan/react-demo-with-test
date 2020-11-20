import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UndoList from './components/UndoList';
import { useSelector, useDispatch } from 'react-redux';
import { increase } from '../../store/actions';
import axios from 'axios';

export default function TodoList(params) {
  const [undoList, setUndoList] = useState([]);
  const reduxValue = useSelector((state) => state.common.reduxValue);
  const dispatch = useDispatch();
  const addUndoList = (item) => {
    setUndoList([...undoList, { value: item, editable: false }]);
  };
  const deleteItem = (index) => {
    const list = [...undoList];
    list.splice(index, 1);
    setUndoList(list);
  };
  const changeStatus = (index) => {
    const list = [...undoList].map((item) => ({
      ...item,
      editable: false,
    }));
    list[index].editable = true;
    setUndoList(list);
  };
  const editItem = (index, value) => {
    const list = [...undoList];
    list[index].value = value;
    setUndoList(list);
  };

  useEffect(() => {
    axios.get('/getUndoList').then((res) => {console.log(res.data); setUndoList(res.data.undoList)});
  }, []);

  return (
    <div>
      <h3 data-test="redux-value">{reduxValue}</h3>
      <button data-test="redux-btn" onClick={() => dispatch(increase())}>
        increase reduex value
      </button>
      <Header addItem={addUndoList} />
      <h2>Todo</h2>
      <UndoList
        undoList={undoList}
        deleteItem={deleteItem}
        changeStatus={changeStatus}
        editItem={editItem}
      />
      <h2>Done</h2>
    </div>
  );
}
