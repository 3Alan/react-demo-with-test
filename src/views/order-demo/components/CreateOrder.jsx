import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../store/actions';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const numList = [10, 20, 30, 48, 60, 96, 128];
const userList = ['Alan', 'Bob'];
export default function CreateOrder() {
  const orderList = useSelector((state) => state.order.orderList);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const list = JSON.parse(JSON.stringify(orderList));
    values.orderId = new Date().valueOf();
    values.total = values.num * values.price;
    values.refund = false;
    values.refundOrder = false;
    values.transferOrder = false;
    list.push(values);
    dispatch(createOrder(list));
  };

  const handleChange = (key, value) => {
    form.setFieldsValue({ [key]: value });
  };

  return (
    <div style={{ padding: 10 }}>
      <Form {...layout} name="basic" onFinish={onFinish} data-testid="form">
        <Form.Item label="用户名" name="user" key="user">
          <Select
            style={{ width: 120 }}
            onChange={() => handleChange('user')}
            data-testid="user"
          >
            {userList.map((item, index) => (
              <Option value={item} key={index} data-testid="option">
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="课时数" name="num" key="num">
          <Select
            style={{ width: 120 }}
            onChange={() => handleChange('num')}
            data-testid="num"
          >
            {numList.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="单价" name="price">
          <Input type="number" autoComplete="off" data-testid="price" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" data-testid="submit">
            创建订单
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
