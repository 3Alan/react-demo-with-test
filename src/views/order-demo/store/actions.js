import { CREATE_ORDER, REFUND_ORDER } from './types';

const createOrder = (data) => (dispatch) => {
  dispatch({ type: CREATE_ORDER, data });
};

const refundOrder = (data) => (dispatch) => {
  dispatch({ type: REFUND_ORDER, data });
};

export { createOrder, refundOrder };
