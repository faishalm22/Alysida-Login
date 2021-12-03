const initStateForgot = {
  identity: '',
  code: '',
};

export const forgotReducer = (state = initStateForgot, action) => {
  if (action.type === 'SET_IDENTITY') {
    return {
      ...state,
      identity: action.value.identity,
    };
  }
  if (action.type === 'SET_IDENTITY_CODE') {
    return {
      ...state,
      code: action.value,
    };
  }
  return state;
};