const initialState = {
    reduxValue: 1,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'increase':
            return { reduxValue: state.reduxValue + 1 };
        default:
            return state;
    }
};
