import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { signUpSchema } from "../../Schemas";
import axios from "axios";

const SignUP = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
        try {
          // Make an API request using axios
          const response = await axios.post("YOUR_LOGIN_API_ENDPOINT", values);

          // Handle successful login (redirect, show success message, etc.)
          console.log("Login successful:", response.data);

          // Reset the form after successful submission
          resetForm();
        } catch (error) {
          console.error(
            "Login failed:",
            error instanceof Error
              ? error.message
              : "An unknown error occurred."
          );
        }
      },
    });

  return (
    <Wrapper>
      <LoginForm>
        <FormTitle>Hubble Dashboard</FormTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            autoComplete="off"
            name="username"
            id="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && (
            <FormError>{errors.username}</FormError>
          )}
          <Input
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <FormError>{errors.password}</FormError>
          )}
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </LoginForm>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const LoginForm = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  height: 100%;
`;

const FormTitle = styled.h1`
  margin: 30px 0 80px;
  font-size: 24px;
  text-align: center;
  color: #55311c;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 25px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:hover {
    bordor-color: blue;
  }
`;

const FormError = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  color: #b22b27;
`;

const SubmitButton = styled.button`
  width: 50%;
  padding: 12px;
  align: center;
  margin: 30px 80px 30px;
  font-size: 16px;
  color: #fff;
  background: #55311c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #8c7569;
  }
`;


export default SignUP;
