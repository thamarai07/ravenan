"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useGlobalUser } from "./GlobalUserContext";
const TaskContext = createContext<any>(null);

export const UseTaskList = () => useContext(TaskContext);

export const TaskListGlobal = ({ children }: { children: ReactNode }) => {
  const [Data, setData] = useState<string | null>(null);
  const [dataloading, setLoading] = useState(true);

  const { Data: userid } = useGlobalUser();

  useEffect(() => {
  

    const handleDeleteTask = async (userid: string) => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/gettasklist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setData(data.tasklist);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching task details:", err);
      }
    };
    handleDeleteTask(userid)
  }, [dataloading]);

  return (
    <TaskContext.Provider value={{ Data, dataloading, setLoading }}>
      {children}
    </TaskContext.Provider>
  );
};
