"use server";

import TaskDetailsClient from "@/app/components/task/details";
import { AuthProvider } from "@/app/contexts/AuthContext";
export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
console.log(id)
  return (
    <AuthProvider>
      <TaskDetailsClient id={id} />
    </AuthProvider>
  );
}
