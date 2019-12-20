/* jshint esversion: 9 */
import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// removed:
// state
// onSubmit
// onChange

const OnboardForm = ({ values, errors, touched, status }) => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setPeople(people => [...people, status]);
  }, [status]);
  return (
    <div className="onboarding-form">
      <Form>
        <label htmlFor="name">
          Name:
          <Field id="name" type="text" name="name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          Email:
          <Field id="email" type="email" name="email" />
        </label>
        <label htmlFor="password">
          Password:
          <Field id="password" type="text" name="password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label htmlFor="role">
          Role:
          <Field

            as="select"
            id="role"
            type="text"
            name="role"
          >
            <option >Choose an option</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
          </Field>
        </label>
        <label htmlFor="terms">
          Terms of Service
          <Field type="checkbox" id="terms" name="terms" />

        </label>
        <button>Submit!</button>
      </Form>
      {people.map(people => (
        <ul key={people.id}>
          <li>Name: {people.name}</li>
          <li>Email: {people.email}</li>
          <li>Password: {people.password}</li>
          <li>Role: {people.role}</li>
          <li>Terms: {people.terms.toString()}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikOnboardForm = withFormik({
  mapPropsToValues({name, email, password, role, terms }) {
    return {
      name: name || "",
      email: email|| "",
      password: email|| "",
      role: email|| "",
      terms: false

    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    terms: Yup.boolean()
  }),
  handleSubmit(values, { setStatus }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(OnboardForm);
// replaced AnimalForm with FormikAnimalForm
export default FormikOnboardForm;
