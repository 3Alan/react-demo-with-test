import React from 'react';
import '../../../style.css';

export default function UndoList(props) {
    const { undoList, deleteItem, changeStatus, editItem } = props;
    return (
        <div>
            count：<span data-test="count">{undoList.length}</span>
            {undoList.map((item, index) => (
                <div
                    data-test="list-item"
                    key={index}
                    className="list-item"
                    onClick={() => changeStatus(index)}
                >
                    {item.editable ? (
                        <input
                            data-test="edit"
                            style={{ flex: 1 }}
                            value={item.value}
                            onChange={(e) => editItem(index, e.target.value)}
                        />
                    ) : (
                        <div style={{ flex: 1 }}>{item.value}</div>
                    )}

                    <button
                        data-test="finish"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        style={{ width: 100 }}
                    >
                        完成
                    </button>
                    <button
                        data-test="delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(index);
                        }}
                        style={{ width: 100 }}
                    >
                        删除
                    </button>
                </div>
            ))}
        </div>
    );
}
