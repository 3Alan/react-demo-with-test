import Mock from 'mockjs';

const data = Mock.mock('/getUndoList', {
  'undoList|5': [
    {
      value: '@cname',
    },
  ],
});

export default data;
