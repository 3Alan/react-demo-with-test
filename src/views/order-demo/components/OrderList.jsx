/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Tag, Input, message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { createOrder } from '../store/actions';
import Modal from 'antd/lib/modal/Modal';

export default function OrderList() {
  const orderList = useSelector((state) => state.order.orderList);
  const [alan, setAlan] = useState();
  const [bob, setBob] = useState();
  const [alanTotalPrice, setAlanTotalPrice] = useState();
  const [alanTotalNum, setAlanTotalNum] = useState();
  const [bobTotalNum, setBobTotalNum] = useState();
  const [bobTotalPrice, setBobTotalPrice] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(-1);
  const [refundNum, setRefundNum] = useState(0);
  const dispatch = useDispatch();

  const openRefundModal = (orderId) => {
    setShowModal(true);
    setCurrentItem(orderId);
  };

  const openTransferModal = (orderId) => {
    setShowTransferModal(true);
    setCurrentItem(orderId);
  };

  const refund = () => {
    const newList = JSON.parse(JSON.stringify(orderList));
    const index = newList.findIndex(item => item.orderId === currentItem);
    newList[index].refund = true;
    if (refundNum > newList[index].num) {
      message.error('退课数不能大于已有课时数');
      setShowModal(false);
      return;
    }
    newList.push({
      ...newList[index],
      orderId: new Date().valueOf(),
      total: -(refundNum * newList[index].price),
      refund: true,
      num: -refundNum,
      refundOrder: true,
    });
    console.log(newList);
    dispatch(createOrder(newList));
    setShowModal(false);
  };

  const transfer = () => {
    const newList = JSON.parse(JSON.stringify(orderList));
    const index = newList.findIndex(item => item.orderId === currentItem);
    newList[index].refund = true;
    newList[index].transferOrder = true;
    if (refundNum > newList[index].num) {
      message.error('转换数不能大于已有课时数');
      setShowTransferModal(false);
      return;
    }
    newList.push({
      ...newList[index],
      orderId: new Date().valueOf(),
      total: -(refundNum * newList[index].price),
      refund: false,
      num: -refundNum,
      transferOrder: true,
      refundOrder: false
    });
    newList.push({
      ...newList[index],
      user: newList[index].user === 'Alan' ? 'Bob' : 'Alan',
      orderId: new Date().valueOf() + 1,
      total: refundNum * newList[index].price,
      num: refundNum,
      refund: false,
      transferOrder: true
    });
    dispatch(createOrder(newList));
    setShowTransferModal(false);
  };

  const refundLayout = (record) => {
    if (record.refundOrder && !record.transferOrder) {
      return <Tag color="red">退款订单</Tag>;
    } else if (!record.refund && record.transferOrder) {
      return <Tag color="green">转换订单</Tag>;
    } else if(record.transferOrder) {
      return <Tag color="orange">订单已转换</Tag>;
    } else if (record.refund) {
      return (
        <>
          <Tag color="blue">订单已退款</Tag>
        </>
      );
    } else {
      return (
        <>
          <Button type="primary" danger onClick={() => openRefundModal(record.orderId)}>
            退款
          </Button>
          <Button type="primary" onClick={() => openTransferModal(record.orderId)}>转让</Button>
        </>
      );
    }
  };

  useEffect(() => {
    const alanList = orderList.filter((item) => item.user === 'Alan');
    const bobList = orderList.filter((item) => item.user === 'Bob');
    if (alanList.length !== 0) {
      const alanTotalPrice = alanList
        .map(({ total }) => Number(total))
        .reduce(function (prev, cur, index, array) {
          return prev + cur;
        });
      const alanTotalNum = alanList
        .map(({ num }) => Number(num))
        .reduce(function (prev, cur, index, array) {
          return prev + cur;
        });
      setAlanTotalPrice(alanTotalPrice);
      setAlanTotalNum(alanTotalNum);
    }
    if (bobList.length !== 0) {
      const bobTotalPrice = bobList
        .map(({ total }) => Number(total))
        .reduce(function (prev, cur, index, array) {
          return prev + cur;
        });
      const bobTotalNum = bobList
        .map(({ num }) => Number(num))
        .reduce(function (prev, cur, index, array) {
          return prev + cur;
        });
      setBobTotalPrice(bobTotalPrice);
      setBobTotalNum(bobTotalNum);
    }

    setBob(bobList);
    setAlan(alanList);
  }, [orderList]);

  const columns = [
    {
      title: 'orderId',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '用户名',
      dataIndex: 'user',
      key: 'user',
      render: (text) => <a data-testid="user">{text}</a>,
    },
    {
      title: '课时数',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '总价',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '操作/状态',
      key: 'action',
      render: (text, record, index) => refundLayout(record),
    },
  ];
  return (
    <div>
      <Modal
        title="请输入你的退款的课程数目"
        visible={showModal}
        onOk={refund}
        onCancel={() => setShowModal(false)}
      >
        <Input
          value={refundNum}
          onChange={(e) => setRefundNum(e.target.value)}
        />
      </Modal>
      <Modal
        title="请输入你的转让的课程数目"
        visible={showTransferModal}
        onOk={transfer}
        onCancel={() => setShowTransferModal(false)}
      >
        <Input
          value={refundNum}
          onChange={(e) => setRefundNum(e.target.value)}
        />
      </Modal>
      <div style={{ height: '50vh', position: 'relative' }}>
        <Table columns={columns} dataSource={alan} pagination={false} rowKey={record => record.orderId} />
        <div style={{ position: 'absolute', bottom: 20 }}>
          <Tag color="red">课程总数：{alanTotalNum}</Tag>
          <Tag color="blue">总价格：{alanTotalPrice}</Tag>
        </div>
      </div>
      <div style={{ height: '50vh', position: 'relative' }}>
        <Table columns={columns} dataSource={bob} pagination={false} rowKey={record => record.orderId} />
        <div style={{ position: 'absolute', bottom: 20 }}>
          <Tag color="red">课程总数：{bobTotalNum}</Tag>
          <Tag color="blue">总价格：{bobTotalPrice}</Tag>
        </div>
      </div>
    </div>
  );
}
