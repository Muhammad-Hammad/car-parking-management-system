import {
  LOCATION_FAILURE,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
} from "../constants";

const initialState = {
  locationState: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  location: [],
};
export default function Api(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case LOCATION_REQUEST: {
      return {
        ...state,
        locationState: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case LOCATION_SUCCESS: {
      return {
        ...state,
        locationState: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        location: action?.payload?.data,
      };
    }
    case LOCATION_FAILURE: {
      return {
        ...state,
        locationState: {
          loading: false,
          error: true,
          success: true,
          errorMsg: action?.payload?.data,
        },
      };
    }
    default:
      return state;
  }
}
