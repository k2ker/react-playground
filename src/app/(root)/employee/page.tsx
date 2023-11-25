import EmployeeForm from "@/components/EmployeeForm";
import EmployeeList from "@/components/EmployeeList";
import axios from "axios";
import { Suspense } from "react";

export default function Employee() {
  return (
    <main className="main flex flex-grow flex-col gap-4 px-4  md:flex-row">
      <EmployeeForm />
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeList />
      </Suspense>
    </main>
  );
}
