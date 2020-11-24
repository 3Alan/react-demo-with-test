import { CREATE_ORDER, REFUND_ORDER } from "./types";

const initialState = {
    orderList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return { ...state, orderList: action.data };
        case REFUND_ORDER:
            return { ...state, orderList: action.data };
        default:
            return state;
    }
};
