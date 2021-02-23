import Firebase from "firebase";
import {
  LOCATION_FAILURE,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
} from "../constants";

const requestLocation = () => {
  return {
    type: LOCATION_REQUEST,
  };
};
const receiveLocation = (data) => {
  return {
    type: LOCATION_SUCCESS,
    payload: { data },
  };
};
const rejectLocation = (data) => {
  return {
    type: LOCATION_FAILURE,
    payload: { data },
  };
};

export const getLocation = () => (dispatch) => {
  dispatch(requestLocation());
  Firebase.database()
    .ref(`/Location/`)
    .once("value")
    .then((snapshot) => {
      // let locations = [];
      let data = snapshot.val();
      // let locations = Object.entries(data);
      // snapshot.forEach((childsnapshot) => {
      //   let key = childsnapshot.key;
      //   let data = childsnapshot.val();
      //   locations.push([key, data]);
      // });
      dispatch(receiveLocation(data));
    })
    .catch((err) => {
      dispatch(rejectLocation(err));
    });
};
