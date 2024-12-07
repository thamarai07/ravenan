"use client";

import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import Content from "../components/content";
import { useGlobalUser } from "../contexts/GlobalUserContext";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { TaskListGlobal } from "../contexts/TaskContext";
interface UserInterface {
  Data: string;
}

const Dashboard = () => {
  const { Data, loading: globalUserLoading } = useGlobalUser();
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [UserName, setUserName] = useState<string>("");
  const [UserId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!token && authLoading == false) {
      router.push("/auth/sign-in");
    }
  }, [token, authLoading]);

  useEffect(() => {
    if (!globalUserLoading && Data) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/user_data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Data }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          setUserName(result.user.name);
          setUserId(result.user._id);
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      };

      fetchData();
    }
  }, [Data, globalUserLoading]); 

  if (globalUserLoading || authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TaskListGlobal>
      <div className="max-w-[1024px] m-auto">
        <div className="flex">
          <SideBar user={UserName} />
          <Content UserId={UserId} />
        </div>
      </div>
    </TaskListGlobal>
  );
};

export default Dashboard;
