'use client'
import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { token, loading: authLoading } = useAuth();
  
  const router = useRouter();
  useEffect(() => {
    if (!token && authLoading == false) {
      router.push("/auth/sign-in");
    }
  }, [token, authLoading]);
  return <></>;
};

export default Dashboard;
