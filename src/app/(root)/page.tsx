import EmployeeForm from "@/components/EmployeeForm";
import EmployeeList from "@/components/EmployeeList";
//fork test
export default function Main() {
  return (
    <main className="main flex flex-grow flex-col gap-4 px-4  lg:flex-row">
      <EmployeeForm />
      <EmployeeList />
    </main>
  );
}
