const initialState = {}

const DeviceInfo = (state = initialState, action) => {
  switch (action.type) {
    case "ON_GET_DEVICE_INFO":
      return {
        ...state,
        ...action.payload
      }
      break;
    default:
      return state
  }
}

export default DeviceInfo
