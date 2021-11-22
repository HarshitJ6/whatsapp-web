export const initialState = { user: null, dbId: null };

export const actionTypes = { SET_USER: "SET_USER", SET_ID: "SET_ID" };

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.SET_ID:
      return { ...state, dbId: action.dbId };
    default:
      return state;
  }
};

export default reducer;
