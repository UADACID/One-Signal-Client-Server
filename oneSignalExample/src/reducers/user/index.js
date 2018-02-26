const initialState = {
  email : null
}

const userReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        email:action.payload
      }
      break;
    case "REMOVE_USER_DATA":
      return {
        email:null
      }
      break;
    default:
      return state
  }
}

export default userReducer
