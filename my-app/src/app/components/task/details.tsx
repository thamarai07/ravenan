"use client";

import { TaskListGlobal } from "@/app/contexts/TaskContext";
import { TaskFormInterface } from "@/app/types/types";
import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import Content from "../content";
import { TaskDetailsFormInterface } from "@/app/types/types";
import { useGlobalUser } from "@/app/contexts/GlobalUserContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function TaskDetailsClient({ id }: { id: string }) {
  const [TaskDetails, setTaskDetails] = useState<TaskDetailsFormInterface>({
    title: "",
    description: "",
    due_date: "",
    status: "",
    UserId: {
      email: "",
      name: "",
      _id: "",
    },
  });


  const { Data, loading: globalUserLoading } = useGlobalUser();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/taskdetail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setTaskDetails(result.task);
      } catch (err) {
        console.error("Error fetching task details:", err);
      }
    };
    fetchdata();
  }, [id]);
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token && authLoading == false) {
      router.push("/auth/sign-in");
    }
  }, [token, authLoading]);

  return (
    <TaskListGlobal>
      <div className="max-w-[1024px] m-auto">
        <div className="flex">
          <SideBar user={TaskDetails.UserId.name} />
          <Content UserId={Data} TaskDetails={TaskDetails} />
        </div>
      </div>
    </TaskListGlobal>
  );
}
