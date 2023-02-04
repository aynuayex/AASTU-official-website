export const initialState = { logStatus: false , identity: {}};

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return { logStatus: action.payload.logStatus , identity: action.payload.identity};
  }
  return state;
};
