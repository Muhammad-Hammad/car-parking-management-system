import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Store from "../redux/store";
import App from "./app";
import Firebase from "firebase";
import { firebaseConfig } from "../firebase";
import Booking from "./booking";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library

import DateFnsUtils from "@date-io/date-fns";

Firebase.initializeApp(firebaseConfig);
const store = Store();
function Root() {
  return (
    <Provider store={store}>
      <Router>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </Router>
    </Provider>
  );
}

export default Root;
