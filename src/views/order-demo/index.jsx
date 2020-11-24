import React from 'react';
import { Row, Col } from 'antd';
import CreateOrder from './components/CreateOrder';
import OrderList from './components/OrderList';

export default function OrderDemo() {
  return (
    <div>
      <Row>
        <Col span={10} style={{height: '100vh', borderRight: '1px solid #ccc'}}>
          <CreateOrder />
        </Col>
        <Col span={14}>
          <OrderList style={{height: '100vh'}}/>
        </Col>
      </Row>
    </div>
  );
}
