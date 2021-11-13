const initSafety = {
  tips: [],
};

export const safetyReducer = (state = initSafety, action) => {
  if (action.type === 'SET_SAFETY_TIPS') {
    return {
      ...state,
      tips: action.value,
    };
  }
  return state;
};
