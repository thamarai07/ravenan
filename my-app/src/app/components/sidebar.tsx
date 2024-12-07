import React from "react";
import { UseTaskList } from "../contexts/TaskContext";
import { userDetailsInterface } from "../types/types";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
interface SideBarProps {
  user: string;
}

const SideBar: React.FC<SideBarProps> = ({ user, Refr }: any) => {
  const { Data, setLoading } = UseTaskList();
  const router = usePathname();
  const rout = useRouter();
  const data = router.split("/");
  const handleDeleteTask = async (taskId: string) => {
     const userConfirmed = window.confirm("Are you sure you want to delete this task?");
  
  if (!userConfirmed) {
    return;
  }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/deletetask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      console.log;
      if (result.status == 200) {
        rout.push("/dashboard");
      }
    } catch (err) {
      console.error("Error fetching task details:", err);
    }
  };

  return (
    <div className="w-[30%] bg-gray-400 p-4">
      <p className="text-[20px] font-semibold text-center">
        {" "}
        Well Come {user}{" "}
      </p>
      {Data && Data.length > 0 && (
        <p className="my-4 text-center text-[20px] font-semibold">Task List</p>
      )}
      <ul className="flex flex-col gap-4 mt-4">
        {Data &&
          Data.map((values: userDetailsInterface, index: number) => {
            const isActive = `${data[2]}` === `${values._id}`;
            const paths = data[1] === "taskdetails";

            return (
              <li
                className={`p-2 ${
                  isActive && " !bg-green-400 "
                }  sidebar rounded-sm shadow-lg flex justify-between items-center`}
                key={index}
              >
                <Link href={values._id}>
                  {}
                  {values.title} - {values.status.label}
                </Link>
                <span className="flex gap-6">
                  <Link className="" href={`/taskdetails/${values._id}`}>
                    <CiEdit className="bg-white" />
                  </Link>
                  <MdDeleteOutline
                    className="bg-white"
                    onClick={() => handleDeleteTask(values._id)}
                  />
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SideBar;
