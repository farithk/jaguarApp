const initialState = {
  userId: "farithcomas",
  userContent: null,
  userConnections: null
}

export default function(state= initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case 'USER_ID':
      return { ...state, userId: payload}
    case 'USER_CONTENT':
      return { ...state, userContent: payload}
    case 'USER_CONNECTIONS':
      return { ...state, userConnections: payload}
    default:
      return state;
  }
}
