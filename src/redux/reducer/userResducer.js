const INITIAL_STATE = {
  id: null,
  username: "",
  email: "",
  role: "",
  cart: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
        cart: action.payload.cart,
      };
    case "logout": {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default userReducer;
