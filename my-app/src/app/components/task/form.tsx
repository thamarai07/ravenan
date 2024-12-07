"use client";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { TaskFormInterface } from "@/app/types/types";
import Textarea from "../textarea";
import SelectOption from "../select";
import { SelectOptionProps } from "@/app/types/types";
import { UserIfInterFace } from "@/app/types/types";
import { usePathname } from "next/navigation";
import { UseTaskList } from "@/app/contexts/TaskContext";

const LoginSchema = yup.object().shape({
  title: yup.string().required("Task Title is required"),
  description: yup.string().required("Description is required"),
  due_date: yup.date().required("Due Date is required"),
  status: yup.string().required("Status is required"),
});

export default function CreateUserForm({
  UserId,
  TaskDetails,
}: UserIfInterFace | any) {
  const [TaskStatuses, setTaskStatuses] = useState<
    SelectOptionProps["options"]
  >([]);

  useEffect(() => {
    const fetchTaskStatuses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gettaskstatus");
        const data = await response.json();

        if (data?.tasklist) {
          const formattedStatuses = data.tasklist.map((task: any) => ({
            value: task._id,
            label: task.label,
          }));
          setTaskStatuses(formattedStatuses);
        }
      } catch (err) {
        console.error("Error fetching task statuses:", err);
      }
    };

    fetchTaskStatuses();
  }, []);

  const router = usePathname();
  const data = router.split("/");
  const { Data, setLoading } = UseTaskList();

  const onSubmit = async (values: TaskFormInterface , { resetForm } : any) => {
    values.UserId = UserId;
    try {
      setLoading(true)
      const API_URL = data[1] === "taskdetails" ? "updatetask" : "createtask";
      const response = await fetch(`http://localhost:5000/api/${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        resetForm()
        setLoading(false)
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // Standardize initial values
  const initialValues = {
    title: TaskDetails?.title || "",
    description: TaskDetails?.description || "",
    due_date: TaskDetails?.due_date
      ? new Date(TaskDetails.due_date).toISOString().split("T")[0]
      : "",
    status: TaskDetails?.status || "",
    UserId: UserId,
    taskId : TaskDetails?._id
  };

  return (
    <div className="container max-w-[1024px] m-auto h-[100%]">
      <div className="container max-w-[50%] m-auto rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
          enableReinitialize 
        >
          {({ errors, touched, handleChange, handleBlur, values, setFieldValue } : any) => (
            <Form className="mt-10">
              <div className="mb-4">
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter title of the task"
                  lablename="Task Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class=""
                />
                {errors.title && touched.title && (
                  <div className="text-[10px] text-red-500">
                    {errors.title}
                  </div>
                )}
              </div>

              <Textarea
                name="description"
                value={values.description}
                placeholder="Write Description"
                className="w-full"
                onChange={handleChange}
                lablename="Description"
              />
              {errors.description && touched.description && (
                <div className="text-[10px] text-red-500">
                  {errors.description}
                </div>
              )}

              <div className="mb-4">
                <Input
                  type="date"
                  name="due_date"
                  placeholder="Please Select Date"
                  lablename="Due Date"
                  value={values.due_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class=""
                />

                {errors.due_date && touched.due_date && (
                  <div className="text-[10px] text-red-500">
                    {errors.due_date}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <SelectOption
                  options={TaskStatuses}
                  value={values.status}
                  onChange={(newValue: string) => setFieldValue("status", newValue)}
                />
                {errors.status && touched.status && (
                  <div className="text-[10px] text-red-500">
                    {errors.status}
                  </div>
                )}
              </div>

              <Button
                content={`${TaskDetails ? "Update" : "Create"}`}
                variant="Green"
                className="m-auto mt-4 shadow-lg"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
