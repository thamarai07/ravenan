"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

interface InputInterface {
  name: string;
  password: string;
  email: string;
}

const CreateUserSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  password: yup.string().required("Password is Required"),
  email: yup.string().required("email is Required"),
});

export default function SignIn() {

  const [SignInResponse, setSignInResponse] = useState<number>();  
  const [Show, setShow] = useState(true);
  const router = useRouter();
  const onSubmit = async (values: InputInterface) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        setSignInResponse(response.status);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  useEffect(() => {
    if (SignInResponse == 201) {
      setShow(false);
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 5000);
    }
  }, [SignInResponse]);

  return (
    <div className="container max-w-[1024px] m-auto h-[100%] mt-24">
      <div className="container p-10 shadow-md max-w-[50%] m-auto rounded-lg">
        {Show === true ? (
          <>
            {" "}
            <p className="text-center text-[24px] font-semibold">Create User</p>
            <Formik
              initialValues={{ name: "", password: "", email: "" }}
              validationSchema={CreateUserSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form className="mt-10">
                  {/* Name Input */}
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter Your name"
                    lablename="Name"
                    value={values.name} // Bind Formik's value to input field
                    onChange={handleChange} // Use Formik's onChange
                    onBlur={handleBlur} // Handle blur for validationc
                    class=""
                  />
                  {errors.name && touched.name ? (
                    <div className="text-[10px] text-red-500">
                      {errors.name}
                    </div>
                  ) : null}

                  {/* Email Input */}
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    lablename="Email"
                    value={values.email} // Bind Formik's value to input field
                    onChange={handleChange} // Use Formik's onChange
                    onBlur={handleBlur} // Handle blur for validation
                    class=""
                  />
                  {errors.email && touched.email ? (
                    <div className="text-[10px] text-red-500">
                      {errors.email}
                    </div>
                  ) : null}

                  {/* Password Input */}
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter Your password"
                    lablename="Password"
                    value={values.password} // Bind Formik's value to input field
                    onChange={handleChange} // Use Formik's onChange
                    onBlur={handleBlur} // Handle blur for validation
                    class=""
                  />
                  {errors.password && touched.password ? (
                    <div className="text-[10px] text-red-500">
                      {errors.password}
                    </div>
                  ) : null}

                  {/* Submit Button */}
                  <Button
                    content="Submit"
                    variant="Green"
                    className="m-auto mt-4 shadow-lg"
                  />
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <p className="text-center mb-4 font-semibold">
              User SuccessFully Created... Waiting for Redirect
            </p>
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="flex justify-center"
            />
          </>
        )}
      </div>
    </div>
  );
}
