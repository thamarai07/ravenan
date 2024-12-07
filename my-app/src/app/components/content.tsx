import React, { useEffect, useState, useMemo } from "react";
import TaskFrom from "./task/form";
import { UserIfInterFace } from "../types/types";
import { UseTaskList } from "../contexts/TaskContext";
import { ContentPageMultiStatusTapInterface } from "../types/types";
import Link from "next/link";

export default function Content({
  UserId,
  TaskDetails,
}: UserIfInterFace | any) {
  const { Data } = UseTaskList();

  const IndividualStatus = useMemo(() => {
    if (!Data) return [];
    return Data.reduce((acc: any[], values: any) => {
      const label = values.status.label;
      const existingStatus = acc.find((status) => status.label === label);

      if (existingStatus) {
        existingStatus.count += 1;
      } else {
        acc.push({ label, count: 1 });
      }
      return acc;
    }, []);
  }, [Data]);

  const Count = useMemo(() => (Data ? Data.length : 0), [Data]);
  return (
    <div className="w-[70%] bg-green-200 p-4">
      <p className="text-center text-[20px]">Total Number of task</p>
      <p
        className={`text-center text-[25px] bg-purple-400 w-[30%] block m-auto mt-4 text-white rounded shadow-md`}
      >
        {Count}
      </p>
      <p className="flex justify-center items-center gap-8 my-4 flex-wrap">
        {IndividualStatus.map(
          (values: ContentPageMultiStatusTapInterface, index: number) => (
            <button
              className="bg-slate-500 text-white py-2 px-4 rounded shadow-sm"
              key={index}
            >
              {values.label} - {values.count}
            </button>
          )
        )}
      </p>
      <div className="flex justify-center">
        <Link
          href="/dashboard"
          className=" mt-4 shadow-lg block bg-white p-3 rounded"
        >
          Create New Task
        </Link>
      </div>
      <TaskFrom UserId={UserId} TaskDetails={TaskDetails} />
    </div>
  );
}
