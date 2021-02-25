import { render } from "react-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Firebase from "firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../redux/actions";
import { DateTimePicker } from "@material-ui/pickers";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Alarm, Snooze } from "@material-ui/icons";

export default function Booking() {
  const api = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const { location } = api;
  useEffect(() => {
    dispatch(getLocation());
  }, []);

  console.log(location);
  let keys = location ? Object.keys(location) : [];
  let vals = location ? Object.values(location) : [];
  console.log("key", keys);
  console.log(vals);
  const [selectedDate, handleDateChange] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  console.log(selectedDate);
  return (
    <div className="app">
      <Formik
        initialValues={{ location: "None" }}
        onSubmit={(values) => {
          console.log("val", values);
          let initialDateTimePicker = values.initialDateTimePicker;
          let finalDateTimePicker = values.finalDateTimePicker;
          console.log(
            "total time : ",
            finalDateTimePicker.getTime(),
            initialDateTimePicker.getTime()
          );
        }}
        // validationSchema={Yup.object().shape({
        //   email: Yup.string().email().required("Required"),
        // })}
      >
        {(props) => {
          const {
            values,
            dirty,
            isSubmitting,
            handleChange,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="location">location</label>
              <Field
                id="location"
                name="location"
                as="select"
                value={values.location}
                onChange={async (e) => {
                  const { value } = e.target;
                  setFieldValue("location", value);
                  setFieldValue("slot", "");

                  let l = location[value];
                  let fff = await Object.entries(location[value]);
                  setFieldValue("slots", fff);
                  console.log(fff);
                }}
              >
                <option value="None">Select Location</option>
                {keys.length > 0 &&
                  keys?.map((val, ind) => {
                    return (
                      <option key={ind} value={val}>
                        {val}
                      </option>
                    );
                  })}
              </Field>
              <label htmlFor="slot">slot</label>
              <Field
                value={values.slot}
                id="slot"
                name="slot"
                as="select"
                onChange={handleChange}
                disablePast="true"
              >
                <option value="None">Select Slots</option>

                {values?.slots?.length &&
                  values?.slots?.map((val) => {
                    return (
                      <option key={val[0]} value={val[0]} disabled={val[1]}>
                        {val[0]}
                      </option>
                    );
                  })}
              </Field>
              <Field
                component={DateTimePicker}
                variant="inline"
                value={values.initialDateTimePicker}
                id="initialDateTimePicker"
                name="initialDateTimePicker"
                disablePast="true"
                onChange={(e) => {
                  setFieldValue("initialDateTimePicker", e);
                  console.log(e);
                }}
              ></Field>
              <Field
                component={DateTimePicker}
                variant="inline"
                value={values.finalDateTimePicker}
                id="finalDateTimePicker"
                name="finalDateTimePicker"
                onChange={(e) => {
                  setFieldValue("finalDateTimePicker", e);
                  console.log(e);
                }}
              ></Field>

              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={!dirty}>
                Submit
              </button>

              {/* <DisplayFormikState {...props} /> */}
            </Form>
          );
        }}
      </Formik>

      {/* <MoreResources /> */}
    </div>
  );
}
console.log("asdas");
// const getRegions = (country) => {
//     // Simulate async call

//     return new Promise((resolve, reject) => {
//       switch (country) {
//         case "United States":
//           resolve([
//             { value: "Washington", label: "Washington" },
//             { value: "California", label: "California" },
//           ]);
//           break;
//         case "Canada":
//           resolve([
//             { value: "Alberta", label: "Alberta" },
//             { value: "NovaScotia", label: "Nova Scotia" },
//           ]);
//           break;
//         default:
//           resolve([]);
//       }
//     });
//   };

//   return (
