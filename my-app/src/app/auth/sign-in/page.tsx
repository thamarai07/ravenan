"use client";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Alert from "@/app/components/alert";
import Link from "next/link";
interface InputInterface {
  name: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  password: yup.string().required("Password is Required"),
});

export default function SignIn() {
  const [Clicked, setClicked] = useState(false);
  const onSubmit = async (values: InputInterface) => {
    try {
      setClicked(true);
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.userId);
        window.location.href = "/dashboard";
        setClicked(false);
      } else {
        alert(`Error: ${result.error}`);
        setClicked(false);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  return (
    <>
      <div className="container max-w-[1024px] m-auto h-[100%] mt-24">
        <div className="container p-10 shadow-md max-w-[50%] m-auto rounded-lg">
          <p className="text-center text-[24px] font-semibold">Login</p>

          <Formik
            initialValues={{ name: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="mt-10">
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  lablename="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class=""
                />
                {errors.name && touched.name ? (
                  <div className="text-[10px] text-red-500">{errors.name}</div>
                ) : null}
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  lablename="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class=""
                />
                {errors.password && touched.password ? (
                  <div className="text-[10px] text-red-500">
                    {errors.password}
                  </div>
                ) : null}

                {Clicked == true ? (
                 <div className="loader mt-4 mb-4"></div>
                ) : (
                  <Button
                    content="Submit"
                    variant="Green"
                    className=" m-auto mt-4 shadow-lg"
                  />
                )}
              </Form>
            )}
          </Formik>
          <Alert
            content={`Don't Have Account?`}
            link={
              <Link href="sign-up" className="text-blue-500">
                Create User
              </Link>
            }
          />
        </div>
      </div>
    </>
  );
}
