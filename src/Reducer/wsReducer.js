  export const initialState = {
    wsConnection: ''
  };

  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CONNECTION':
        return {
          ...state,
          wsConnection: action.newValue
        };
      default:
        return state;
    }
  };

  export const setConnection = value => {
  return {
    type: 'SET_CONNECTION',
    newValue: value
  }
};